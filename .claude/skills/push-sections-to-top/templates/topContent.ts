// Fetches editable page sections from the TOP_Dev_Services content CMS.
//
// Each page passes its own top-content/<page>.json as the fallback, so the
// site renders the bundled copy immediately and on any failure (network
// error, missing page, missing section), then swaps in the CMS version once
// it loads. Content is public and keyed by domain; no credentials involved.

import { useEffect, useState } from "react";

const TOP_API = "https://api.thatoneprogrammer.dev";
// Bare production domain registered as the account's topDevWebsiteUrl.
const TOP_DOMAIN = "example.org";

export type SectionType = "hero" | "titleText" | "bodyText" | "image" | "gallery";

export interface Cta { label: string; href: string }
export interface HeroData {
  title: string;
  subtitle?: string;
  images?: string[];
  ctas?: Cta[];
}
export interface TitleTextData {
  title: string;
  text: string;
  image?: { src: string; alt: string };
  ctas?: Cta[];
}
export interface BodyTextData {
  title?: string;
  paragraphs?: string[];
  items?: string[];
  image?: { src: string; alt: string };
  ctas?: Cta[];
}
export interface ImageData { src: string; alt: string; caption?: string }
export interface GalleryData { title?: string; images: { src: string; alt: string }[] }

export interface Section<T = unknown> {
  id?: string;
  type: SectionType;
  data: T;
}

/** Shape of a top-content/<page>.json file (JSON imports type `type` as string). */
export interface PageContent {
  sections: { id?: string; type: string; data: object }[];
}

// One request per page per session, shared across components.
const cache = new Map<string, Promise<Section[] | null>>();

function loadPage(page: string): Promise<Section[] | null> {
  let pending = cache.get(page);
  if (!pending) {
    const url = `${TOP_API}/api/v1/content/page?domain=${encodeURIComponent(TOP_DOMAIN)}&name=${encodeURIComponent(page)}`;
    pending = fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((content) => {
        const sections = content?.body ? JSON.parse(content.body).sections : null;
        return Array.isArray(sections) ? (sections as Section[]) : null;
      })
      .catch(() => null);
    cache.set(page, pending);
  }
  return pending;
}

export function useTopContent(page: string, fallback: PageContent) {
  const [remote, setRemote] = useState<Section[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadPage(page).then((s) => {
      if (!active) return;
      setRemote(s);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [page]);

  /** Section data by id: the CMS version merged over the bundled fallback. */
  function section<T extends object>(id: string): T {
    const local = fallback.sections.find((s) => s.id === id)?.data;
    const live = remote?.find((s) => s.id === id)?.data;
    if (!local && !live && import.meta.env.DEV) {
      console.warn(`top-content: no section "${id}" on page "${page}"`);
    }
    return { ...(local ?? {}), ...((live as object | undefined) ?? {}) } as T;
  }

  return { section, loading };
}
