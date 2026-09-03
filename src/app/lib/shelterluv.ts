// Typed client for the ShelterLuv API.
//
// In dev, requests go to /api/shelterluv/* which the Vite dev server proxies
// to https://www.shelterluv.com/api/v1/* while injecting the secret
// X-Api-Key header (see vite.config.ts). In production there is no dev
// server, so requests instead go straight to a standalone AWS Lambda
// Function URL (see VITE_SHELTERLUV_PROXY_URL) that does the same job:
// paginate, filter, and inject the key server-side. The browser never sees
// the key either way.

/** Raw animal shape as returned by the ShelterLuv API. */
export interface ShelterLuvAnimal {
  "ID": string;
  "Internal-ID": string;
  Name: string;
  Type: string; // "Cat" | "Dog" | ...
  Sex: string;
  Status: string; // e.g. "Available In-Foster", "Available", "Adopted"
  Breed: string;
  Size: string;
  Age: number; // age in months
  CoverPhoto: string;
  Photos: string[];
  Description: string;
  Attributes: { "Internal-ID": string; AttributeName: string; Publish: string }[];
}

interface AnimalsResponse {
  success: number;
  total_count?: string;
  has_more?: boolean;
  animals: ShelterLuvAnimal[];
}

/** Shape returned by the production proxy Lambda, which normalizes server-side. */
interface ProxyAnimalsResponse {
  animals: Animal[];
}

/** Normalized animal shape consumed by the adoption pages. */
export interface Animal {
  id: string;
  name: string;
  type: "Cat" | "Dog";
  age: string; // human-readable, e.g. "2 years", "6 months"
  sex: string;
  breed: string;
  size: string;
  description: string;
  coverPhoto: string;
  photos: string[];
  tags: string[];
}

// In dev, hits the Vite proxy. In production, VITE_SHELTERLUV_PROXY_URL
// points at the Lambda Function URL (set at build time, e.g. by CI) and the
// proxy already does pagination + filtering, so a different code path below
// calls it directly instead of looping client-side.
const DEV_BASE = "/api/shelterluv";
const PROD_PROXY_URL = import.meta.env.VITE_SHELTERLUV_PROXY_URL as string | undefined;

/** Convert an age in months into a friendly "X years" / "Y months" string. */
function formatAge(months: number): string {
  if (!months || months < 0) return "Unknown age";
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
}

/** Derive an age-bucket filter tag from species + age in months. */
function ageTag(type: "Cat" | "Dog", months: number): string | null {
  if (!months || months < 0) return null;
  if (months < 12) return type === "Dog" ? "Puppy" : "Kitten";
  if (months >= 120) return "Senior"; // 10+ years
  return "Adult";
}

/** Normalize a raw ShelterLuv animal into the page-facing Animal shape. */
function normalize(raw: ShelterLuvAnimal): Animal {
  const type = (raw.Type === "Dog" ? "Dog" : "Cat") as "Cat" | "Dog";

  // Published attributes become filter tags (e.g. "Good with Kids").
  const attrTags = (raw.Attributes ?? [])
    .filter((a) => a.Publish === "Yes")
    .map((a) => a.AttributeName);

  const tags = [ageTag(type, raw.Age), raw.Size, ...attrTags].filter(
    (t): t is string => Boolean(t)
  );

  return {
    id: raw["Internal-ID"] ?? raw.ID,
    name: raw.Name,
    type,
    age: formatAge(raw.Age),
    sex: raw.Sex,
    breed: raw.Breed,
    size: raw.Size,
    description: raw.Description?.trim() ?? "",
    coverPhoto: raw.CoverPhoto,
    photos: raw.Photos ?? [],
    tags,
  };
}

/** A ShelterLuv status counts as adoptable when it begins with "Available". */
function isAvailable(animal: ShelterLuvAnimal): boolean {
  return /available/i.test(animal.Status ?? "");
}

/**
 * Fetch every publishable animal, following pagination, and return the
 * normalized, currently-available subset for the requested species.
 */
export async function fetchAvailableAnimals(
  type: "Cat" | "Dog",
  signal?: AbortSignal
): Promise<Animal[]> {
  if (PROD_PROXY_URL) {
    // Production: the Lambda proxy already paginates, filters, and
    // normalizes server-side — one request gets the final list.
    const res = await fetch(`${PROD_PROXY_URL}?type=${type}`, {
      signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`ShelterLuv proxy request failed (${res.status})`);
    }
    const data: ProxyAnimalsResponse = await res.json();
    return data.animals;
  }

  // Dev: talk to the Vite proxy and do pagination + filtering here.
  const limit = 100;
  let offset = 0;
  const all: ShelterLuvAnimal[] = [];

  // Guard against an unbounded loop if the API misbehaves.
  for (let page = 0; page < 50; page++) {
    const res = await fetch(
      `${DEV_BASE}/animals?status_type=publishable&limit=${limit}&offset=${offset}`,
      { signal, headers: { Accept: "application/json" } }
    );
    if (!res.ok) {
      throw new Error(`ShelterLuv request failed (${res.status})`);
    }
    const data: AnimalsResponse = await res.json();
    if (!data.success) {
      throw new Error("ShelterLuv returned an unsuccessful response");
    }

    const batch = data.animals ?? [];
    all.push(...batch);

    if (batch.length < limit) break;
    offset += limit;
  }

  return all
    .filter((a) => a.Type === type && isAvailable(a))
    .map(normalize);
}
