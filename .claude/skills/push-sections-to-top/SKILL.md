---
name: push-sections-to-top
description: Move a client website's hardcoded page sections (hero, headings, paragraphs, lists, images, galleries) into the TOP_Dev_Services content CMS, push them with a script, and make the client render them from the API with the hardcoded copy as fallback. Use when the user wants to make a client page editable, "push sections to TOP", sync content, or migrate page copy into TOP_Dev_Services.
---

# Push client page sections into TOP_Dev_Services

Load `top-services-api` for auth and domain rules. The CMS stores one JSON
document per (business, page):

```json
{ "sections": [ { "type": "hero", "data": { ... } } ] }
```

The server only checks that `type` is one of `hero`, `titleText`, `bodyText`,
`image`, `gallery` and that `data` is an object. The `data` shapes below are
the convention — the client renderer and these files must agree.

| type | data |
| --- | --- |
| `hero` | `{ "title", "subtitle"?, "images"?: [url], "ctas"?: [{ "label", "href" }] }` |
| `titleText` | `{ "title", "text", "image"?: { "src", "alt" }, "ctas"?: [{ "label", "href" }] }` |
| `bodyText` | `{ "title"?, "paragraphs"?: [string], "items"?: [string], "image"?: { "src", "alt" }, "ctas"?: [{ "label", "href" }] }` |
| `image` | `{ "src", "alt", "caption"? }` |
| `gallery` | `{ "title"?, "images": [{ "src", "alt" }] }` |

Use `titleText` with `image` + `ctas` for cards (image, heading, blurb,
link), and `ctas` for buttons. `href` is a site route (`/donate`) or a full
URL for external links.

Each section may also carry a stable `"id"` (e.g. `"donate-wishlist"`) so the
client can place it; keep ids unique per page.

TOPrism's admin editor edits exactly these fields
(`src/app/utils/sections.ts` in the TOPrism repo). Change both together:
a field the editor doesn't know still shows up there as "other fields", but
staff can't edit it in the editor the site expects.

## Workflow

### 1. Extract

For each page the user picks, read the component and pull **copy only** into
`top-content/<page>.json` at the client repo root. Page name = the route slug
(`home`, `donate`, `get-involved`). Leave out:
- Data that belongs to another service (events → Events, articles → Blogs,
  adoptable animals → ShelterLuv, products → Products).
- Layout, icons, class names, and anything that is code rather than copy.
- Contact details used in `href`s unless the user wants them editable.

Write images exactly as the client references them — site-relative paths like
`/foster.webp`. The push script uploads them for you (see below), so the JSON
in the client repo stays readable and keeps working locally. Images imported
from `src/` (bundled by Vite) are not picked up; copy them into `public/` first
if they should be editable.

### 2. Push

The script is in this skill folder: `scripts/push-content.mjs` (Node 18+, no
dependencies). One login is enough: the **client's own business account**. The
server lets the domain's owner (or an admin) add pages and write content.

| Login | Env vars | Used for |
| --- | --- | --- |
| Client's business account | `TOP_EMAIL`, `TOP_PASSWORD` | Normal mode: uploads images (they belong to the client), adds pages, writes content. Its website must match `--domain`. |
| Admin account (optional) | `TOP_ADMIN_EMAIL`, `TOP_ADMIN_PASSWORD` | When set, pages and content are written as the admin instead. Images still need the client login, so admin-only runs can't use local images. |

Credentials come only from the environment — never arguments, files in the
repo, or chat. The user sets them in their own terminal; never ask them to
paste a password into the conversation.

```bash
export TOP_EMAIL=<client business email> TOP_PASSWORD=<...>
node .claude/skills/push-sections-to-top/scripts/push-content.mjs \
  --domain animaladvocates.net --dir top-content --dry-run
# review the plan, then run again without --dry-run
```

Run from the client repo root. If the client's `package.json` has a
`top:push` script, prefer `npm run top:push -- --dry-run`.

It validates every file and image locally first, then:

1. **Logs in and checks each account** before writing anything: the client
   login's website must match `--domain`; an admin login must have role
   `ADMIN`.
2. **Uploads images** with the client login. Every string in section `data`
   that looks like `/<file>.(webp|png|jpg|jpeg|gif|svg|avif)` is read from
   `--public` (default `public`) and uploaded. An image already uploaded with
   the same file name and size is reused, so reruns don't create duplicates.
   The pushed copy gets the S3 URL; the local JSON is unchanged. Missing files
   and files over 1 MB (the server's upload limit) stop the run before
   anything is written. Links like `"href": "/adopt"` are untouched.
3. **Adds** missing pages to the domain's page list via
   `PUT /api/v1/admin/web-pages` (never removes — removing a page deletes its
   content server-side). The server creates an empty document for each new
   page.
4. **Writes content** for each page via `PUT /api/v1/admin/content`, skipping
   pages whose content is already identical.

A 403 on step 3 or 4 means the server doesn't consider the login the
domain's owner or an admin.

`--api` overrides the base URL for a local server (`http://localhost:5000`).
Run it from the client repo root so `--dir` and `--public` resolve there.

### 3. Render in the client

Copy the two templates into the client:
- `templates/topContent.ts` → e.g. `src/app/lib/topContent.ts`; set `TOP_DOMAIN`.
- `templates/TopLinks.tsx` → e.g. `src/app/components/TopLinks.tsx`. `CtaLink`
  renders a CTA (router `Link` for `/routes`, new tab for `http(s)`, plain
  anchor for `mailto:`/`tel:`); `LinkedText` turns an email/phone that a
  paragraph mentions into a link in place. It assumes `react-router`; adjust
  the import for other routers.

Each page imports its own JSON as the fallback, so the copy lives in one
place and the page renders instantly, before and without the API:

```tsx
import donateContent from "../../../top-content/donate.json";

const { section } = useTopContent("donate", donateContent);
const hero = section<HeroData>("hero");
<h1>{hero.title}</h1>
{hero.ctas?.map((cta) => (
  <CtaLink key={cta.href} href={cta.href}><Button>{cta.label}</Button></CtaLink>
))}
```

`section(id)` returns the CMS version merged over the local section, so a
network error, a missing page, or a missing section never renders blank.
Replace only the text, links and images — keep every element and class name
as it was. For repeated cards, keep the section ids in a small array (plus any
per-card icon or class) and map over it.

Prove nothing visible changed: before editing, build and capture each route's
`main` text, link hrefs, `img` srcs and background images with Playwright
(block the API host so pages render from the local JSON); capture again after
and diff. Then serve modified content for the API host and check the edits
appear.

### 4. Verify

```bash
curl -sS "https://api.thatoneprogrammer.dev/api/v1/content/page?domain=<domain>&name=<page>"
```

Then run the client's dev server and check the page with the network tab (one
request per page, 200, no console errors). Run the client's build.

## Adding a section type

New types need a server change: add the name to `VALID_SECTION_TYPES` in
`src/main/java/topdev/com/micro/email/service/ContentService.java` in the
TOP_Dev_Services repo, update this table and the client renderer, and
deploy the server before pushing content that uses it.
