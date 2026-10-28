#!/usr/bin/env node
// Push <page>.json files into the TOP_Dev_Services content CMS.
//
// Usage:
//   TOP_EMAIL=... TOP_PASSWORD=... node push-content.mjs \
//     --domain example.org --dir top-content [--public public] [--page home] [--api URL] [--dry-run]
//
// Logins (set in the environment, never passed as arguments):
//   - TOP_EMAIL / TOP_PASSWORD: the client's business account, whose website
//     must be --domain. It can do everything: upload images (they belong to
//     the client) and add pages / write content via /api/v1/admin/*, which
//     accept the domain's owner. This is the normal way to run the script.
//   - TOP_ADMIN_EMAIL / TOP_ADMIN_PASSWORD (optional): an ADMIN account. When
//     set, pages and content are written as the admin instead. Images still
//     need the client login, so with admin only, pages can't use local images.
//
// Each file in --dir is named <page>.json and holds {"sections":[{type,data}]}.
// Pages are only ever added to the domain's page list, never removed:
// PUT /admin/web-pages deletes content for any page left out of the list.
//
// Any string in section data that is a site-relative image path ("/foo.webp")
// is read from --public, uploaded to the client's S3 images, and replaced by
// the hosted URL in what gets pushed. The local JSON keeps the local paths.
// An image already uploaded with the same file name and size is reused.

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const VALID_TYPES = ["hero", "titleText", "bodyText", "image", "gallery"];
const IMAGE_TYPES = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};
const LOCAL_IMAGE = /^\/(?!\/)[^?#]+\.(webp|png|jpe?g|gif|svg|avif)$/i;
// Spring's default multipart limit; uploads above it are rejected server-side.
const MAX_UPLOAD_BYTES = 1024 * 1024;

function parseArgs(argv) {
  const args = { api: "https://api.thatoneprogrammer.dev", public: "public", dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a.startsWith("--")) args[a.slice(2)] = argv[++i];
  }
  if (!args.domain || !args.dir) {
    console.error("Required: --domain <domain> --dir <folder of page.json files>");
    process.exit(2);
  }
  args.api = args.api.replace(/\/+$/, "");
  return args;
}

function validate(page, doc) {
  if (!doc || !Array.isArray(doc.sections)) {
    throw new Error(`${page}: body must contain a "sections" array`);
  }
  const ids = new Set();
  doc.sections.forEach((s, i) => {
    if (typeof s?.type !== "string" || !VALID_TYPES.includes(s.type)) {
      throw new Error(`${page}: section ${i} has invalid type "${s?.type}" (valid: ${VALID_TYPES.join(", ")})`);
    }
    if (!s.data || typeof s.data !== "object" || Array.isArray(s.data)) {
      throw new Error(`${page}: section ${i} must have a "data" object`);
    }
    if (s.id !== undefined) {
      if (ids.has(s.id)) throw new Error(`${page}: duplicate section id "${s.id}"`);
      ids.add(s.id);
    }
  });
}

async function api(base, method, route, { token, json, raw, form } = {}) {
  const headers = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  let body;
  if (form !== undefined) {
    body = form; // fetch sets the multipart boundary header itself
  } else if (json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  } else if (raw !== undefined) {
    headers["Content-Type"] = "application/json";
    body = raw;
  }
  const res = await fetch(base + route, { method, headers, body });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { ok: res.ok, status: res.status, data };
}

async function loadPages(dir, only) {
  let names;
  try {
    names = await readdir(dir);
  } catch {
    throw new Error(`No page folder "${dir}" — extract the pages into ${dir}/<page>.json first`);
  }
  const files = names.filter((f) => f.endsWith(".json"));
  const pages = [];
  for (const f of files) {
    const page = path.basename(f, ".json");
    if (only && page !== only) continue;
    const doc = JSON.parse(await readFile(path.join(dir, f), "utf8"));
    validate(page, doc);
    pages.push({ page, doc });
  }
  if (pages.length === 0) throw new Error(`No page files found in ${dir}`);
  return pages;
}

/** Collect every local image path referenced anywhere in the docs. */
function collectImages(value, found = new Set()) {
  if (typeof value === "string") {
    if (LOCAL_IMAGE.test(value)) found.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectImages(v, found));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectImages(v, found));
  }
  return found;
}

/** Deep-copy value with local image paths swapped for hosted URLs. */
function replaceImages(value, urls) {
  if (typeof value === "string") return urls.get(value) ?? value;
  if (Array.isArray(value)) return value.map((v) => replaceImages(v, urls));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, replaceImages(v, urls)]));
  }
  return value;
}

/** Resolve each referenced path to a file under publicDir; fail before any write if one is missing. */
async function resolveImageFiles(paths, publicDir) {
  const root = path.resolve(publicDir);
  const files = [];
  for (const ref of paths) {
    const file = path.resolve(root, "." + decodeURI(ref));
    if (!file.startsWith(root + path.sep)) throw new Error(`Image path escapes ${publicDir}: ${ref}`);
    let info;
    try {
      info = await stat(file);
    } catch {
      throw new Error(`Image not found: ${ref} (looked in ${file})`);
    }
    if (info.size > MAX_UPLOAD_BYTES) {
      throw new Error(`Image too large to upload (${info.size} bytes, max ${MAX_UPLOAD_BYTES}): ${ref}`);
    }
    files.push({ ref, file, name: path.basename(file), size: info.size });
  }
  return files;
}

async function listUploadedImages(base, token) {
  const all = [];
  for (let page = 0; page < 100; page++) {
    const res = await api(base, "GET", `/api/v1/images?page=${page}&size=100`, { token });
    if (!res.ok) throw new Error(`Could not list images (${res.status})`);
    all.push(...(res.data?.content ?? []));
    if (res.data?.last !== false) break;
  }
  return all;
}

async function uploadImages(base, token, files, dryRun) {
  const urls = new Map();
  if (files.length === 0) return urls;
  const uploaded = await listUploadedImages(base, token);
  for (const f of files) {
    const existing = uploaded.find((img) => img.fileName === f.name && Number(img.fileSize) === f.size);
    if (existing) {
      console.log(`= image ${f.ref}: already uploaded`);
      urls.set(f.ref, existing.url);
      continue;
    }
    console.log(`+ image ${f.ref}: upload`);
    if (dryRun) continue;
    const type = IMAGE_TYPES[path.extname(f.name).toLowerCase()];
    const form = new FormData();
    form.append("file", new Blob([await readFile(f.file)], { type }), f.name);
    const res = await api(base, "POST", "/api/v1/images", { token, form });
    if (!res.ok || !res.data?.url) {
      throw new Error(`Uploading ${f.ref} failed (${res.status}): ${JSON.stringify(res.data)}`);
    }
    urls.set(f.ref, res.data.url);
    uploaded.push(res.data);
  }
  return urls;
}

/** Explain a failed write, with a hint for the server's access-check statuses. */
function describeFailure(res) {
  if (res.status === 401) return "401 — the login token was missing or rejected; check the server's jwt.secret hasn't changed";
  if (res.status === 403) {
    return "403 — the server says this login can't manage this domain (it must be an ADMIN or the domain's owner)";
  }
  return `${res.status}: ${JSON.stringify(res.data)}`;
}

async function login(base, emailVar, passwordVar, label) {
  const email = process.env[emailVar];
  const password = process.env[passwordVar];
  if (!email || !password) throw new Error(`Set ${emailVar} and ${passwordVar} in the environment`);
  const res = await api(base, "POST", "/api/v1/auth/login", { json: { email, password } });
  if (!res.ok || !res.data?.token) {
    throw new Error(`${label} login failed (${res.status}) — check ${emailVar} and ${passwordVar}`);
  }
  return res.data;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const pages = await loadPages(args.dir, args.page);
  console.log(`Validated ${pages.length} page(s): ${pages.map((p) => p.page).join(", ")}`);
  const imageFiles = await resolveImageFiles(collectImages(pages.map((p) => p.doc)), args.public);
  if (imageFiles.length) console.log(`Found ${imageFiles.length} local image(s) in ${args.public}`);

  const bare = (d) => (d ?? "").toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/+$/, "");
  const hasClient = Boolean(process.env.TOP_EMAIL || process.env.TOP_PASSWORD);
  const hasAdmin = Boolean(process.env.TOP_ADMIN_EMAIL || process.env.TOP_ADMIN_PASSWORD);
  if (!hasClient && !hasAdmin) {
    throw new Error("Set TOP_EMAIL and TOP_PASSWORD (the client's login) in the environment");
  }
  if (imageFiles.length && !hasClient) {
    throw new Error("These pages use local images, which upload to the client's account — set TOP_EMAIL and TOP_PASSWORD");
  }

  // Log in and check both accounts before writing anything.
  let client = null;
  if (hasClient) {
    client = await login(args.api, "TOP_EMAIL", "TOP_PASSWORD", "client");
    if (!client.topDevWebsiteUrl || bare(client.topDevWebsiteUrl) !== bare(args.domain)) {
      throw new Error(
        `The TOP_EMAIL login belongs to "${client.topDevWebsiteUrl ?? "no website"}", not "${args.domain}" — ` +
          "refusing to push. Use the client's own business account."
      );
    }
  }
  let admin = null;
  if (hasAdmin) {
    admin = await login(args.api, "TOP_ADMIN_EMAIL", "TOP_ADMIN_PASSWORD", "admin");
    if (admin.role !== "ADMIN") {
      throw new Error(`The TOP_ADMIN_EMAIL login has role "${admin.role}", not ADMIN — refusing to push`);
    }
  }
  const writer = admin ?? client;
  console.log(`Writing pages as ${admin ? "admin" : "client"} (${writer.email})`);

  let imageUrls = new Map();
  if (imageFiles.length) {
    imageUrls = await uploadImages(args.api, client.token, imageFiles, args.dryRun);
  }

  const domainQ = encodeURIComponent(args.domain);
  const current = await api(args.api, "GET", `/api/v1/content/page?domain=${domainQ}`);
  if (!current.ok) {
    throw new Error(`Could not read pages for ${args.domain} (${current.status}): ${JSON.stringify(current.data)}`);
  }
  const existing = Array.isArray(current.data) ? current.data : [];
  const missing = pages.map((p) => p.page).filter((p) => !existing.includes(p));

  if (missing.length) {
    console.log(`Add pages to ${args.domain}: ${missing.join(", ")}`);
    if (!args.dryRun) {
      // Union only. Sending a shorter list would delete content server-side.
      // New pages get an empty {"sections":[]} document, filled in below.
      const res = await api(args.api, "PUT", `/api/v1/admin/web-pages?domain=${domainQ}`, {
        token: writer.token,
        json: { webPages: [...existing, ...missing] },
      });
      if (!res.ok) throw new Error(`Updating page list failed: ${describeFailure(res)}`);
    }
  }

  for (const { page, doc } of pages) {
    const body = JSON.stringify(replaceImages(doc, imageUrls));
    const pageQ = encodeURIComponent(page);
    const found = await api(args.api, "GET", `/api/v1/content/page?domain=${domainQ}&name=${pageQ}`);
    if (found.ok && found.data?.body === body) {
      console.log(`= ${page}: unchanged`);
      continue;
    }
    console.log(`${missing.includes(page) ? "+" : "~"} ${page}: write content`);
    if (args.dryRun) continue;
    const res = await api(args.api, "PUT", `/api/v1/admin/content?domain=${domainQ}&page=${pageQ}`, {
      token: writer.token,
      raw: body,
    });
    if (!res.ok) throw new Error(`${page}: write failed: ${describeFailure(res)}`);
  }

  console.log(args.dryRun ? "Dry run complete — nothing was written." : "Done.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
