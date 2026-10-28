// Fetches editable page sections from the TOP_Dev_Services content CMS.
//
// Every read falls back to the hardcoded default passed by the page, so a
// network error, a missing page, or a missing section never renders blank.
// Content is public and keyed by domain; no credentials are involved.

import { useEffect, useState } from "react";

const TOP_API = "https://api.thatoneprogrammer.dev";
// Bare production domain registered as the account's topDevWebsiteUrl.
const TOP_DOMAIN = "example.org";

export type SectionType = "hero" | "titleText" | "bodyText" | "image" | "gallery";

export interface HeroData {
  title: string;
  subtitle?: string;
  images?: string[];
  ctas?: { label: string; href: string }[];
}
export interface TitleTextData { title: string; text: string }
export interface BodyTextData { title?: string; paragraphs?: string[]; items?: string[] }
export interface ImageData { src: string; alt: string; caption?: string }
export interface GalleryData { title?: string; images: { src: string; alt: string }[] }

export interface Section<T = unknown> {
  id?: string;
  type: SectionType;
  data: T;
}

// One request per page per session, shared across components.
const cache = new Map<string, Promise<Section[] | null>>();

function loadPage(page: string): Promise<Section[] | null> {
  let pending = cache.get(page);
  if (!pending) {
    const url = `${TOP_API}/api/v1/content/page?domain=${encodeURIComponent(TOP_DOMAIN)}&name=${encodeURIComponent(page)}`;
    pending = fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((content) => (content?.body ? (JSON.parse(content.body).sections as Section[]) : null))
      .catch(() => null);
    cache.set(page, pending);
  }
  return pending;
}

export function useTopContent(page: string) {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadPage(page).then((s) => {
      if (!active) return;
      setSections(s);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [page]);

  /** Find a section by id (or by type when no id matches) and merge it over the default. */
  function section<T extends object>(idOrType: string, fallback: T): T {
    const found =
      sections?.find((s) => s.id === idOrType) ??
      sections?.find((s) => s.type === idOrType);
    return found ? { ...fallback, ...(found.data as Partial<T>) } : fallback;
  }

  return { sections, loading, section };
}
