// SERVER ONLY. Never import this file at the top level of a page or component.
// Use `await import('@/lib/busData')` inside getStaticProps / getServerSideProps.
// The bundled dataset is imported as a string (see next.config.mjs), not read with fs.
import sourceTsv from "@/data/source.tsv";
import { parseSheet } from "./parseSheet";
import { stopKey } from "./locationUtils";

// Re-export pure helpers so existing server-side imports keep working.
export { getStops, getRelated } from "./busUtils";
import { getStops } from "./busUtils";

const slugify = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---- Cache with expiry (and no caching of failures) ----
const TTL = 60 * 60 * 1000; // 1 hour
let cache;
let cachedAt = 0;

export function getBuses() {
  if (!cache || Date.now() - cachedAt > TTL) {
    cachedAt = Date.now();
    cache = load().catch((e) => {
      cache = undefined; // don't keep a rejected promise forever
      throw e;
    });
  }
  return cache;
}
export const getAllBuses = getBuses;

async function load() {
  let rows = [];

  // Prefer non-public env vars; the NEXT_PUBLIC_ name is kept only as a fallback.
  const url =
    process.env.SHEET_CSV_URL ||
    process.env.SHEET_TSV_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL;

  // 1) Try the live Google Sheets dataset.
  if (url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      rows = parseSheet(await res.text());
    } catch (e) {
      console.warn(
        "[data] Live sheet unavailable, falling back to bundled source.tsv:",
        e.message
      );
    }
  }

  // 2) Fall back to the bundled TSV dataset (compiled into the build).
  if (!rows.length) {
    try {
      rows = parseSheet(sourceTsv);
    } catch (e) {
      console.error("[data] Could not parse bundled source.tsv:", e);
    }
  }

  if (!rows.length) {
    throw new Error("No bus routes found in the dataset.");
  }

  const seen = new Set();

  return rows.map((b) => {
    const base = slugify(b.name) || `bus-${b.id}`;
    let slug = base;
    let n = 0;

    // Guarantee uniqueness.
    while (seen.has(slug)) {
      slug = `${base}-${b.id}${n ? `-${n}` : ""}`;
      n++;
    }
    seen.add(slug);

    // Whole-word "AC" only (not "Space", "Coach", etc.)
    const isAC = /\bac\b/i.test(b.type || "");

    return {
      ...b,
      slug,
      stopKeys: b.stops.map(stopKey),
      min_fare: isAC ? 20 : 10,
      max_fare: isAC ? 100 : 45,
      fare_text: isAC
        ? "AC Flat/Distance Rate (Approx ৳20 - ৳100)"
        : "Standard BRTA Rate (Approx ৳10 - ৳45)",
    };
  });
}

export async function getBusBySlug(slug) {
  const buses = await getBuses();
  return buses.find((b) => b.slug === slug || String(b.id) === slug) || null;
}

export async function getAllStops() {
  const buses = await getBuses();
  return getStops(buses).map((s) => s.name);
}
