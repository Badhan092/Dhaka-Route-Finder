import { findDirect, findTransfers } from "@/lib/routeMatching";
import { nameMatches, stopKey } from "@/lib/locationUtils";

const firstValue = (v) => (Array.isArray(v) ? v[0] : v)?.trim() || "";

export function parseParams(query) {
  return {
    from: firstValue(query.from),
    to: firstValue(query.to),
    q: firstValue(query.q),
    sort: firstValue(query.sort) || "stops",
    directOnly: firstValue(query.direct) === "1",
  };
}

const findStop = (stops, name) => stops.find((s) => s.key === stopKey(name));

function suggestStops(stops, name, limit = 5) {
  const key = stopKey(name);
  if (!key) return [];
  return stops
    .filter((s) => s.key.includes(key) || key.includes(s.key))
    .slice(0, limit)
    .map((s) => s.name);
}

const SORTERS = {
  name: (a, b) => a.bus.name.localeCompare(b.bus.name, "en", { numeric: true }),
  stops: (a, b) => a.seg.count - b.seg.count || a.bus.name.localeCompare(b.bus.name),
};

export function searchRoutes(buses, stops, { from, to, q, sort, directOnly }) {
  if (!from || !to) return { status: "idle" };

  const f = findStop(stops, from);
  const t = findStop(stops, to);

  if (!f || !t) {
    const [field, value] = !f ? ["from", from] : ["to", to];
    return {
      status: "unknown-stop",
      field,
      value,
      suggestions: suggestStops(stops, value),
    };
  }

  if (f.key === t.key) return { status: "same-stop" };

  const direct = findDirect(buses, f.key, t.key)
    .filter((r) => nameMatches(r.bus, q))
    .sort(SORTERS[sort] ?? SORTERS.stops);

  const transfers = directOnly
    ? []
    : findTransfers(buses, f.key, t.key).filter(
        (r) => nameMatches(r.a, q) || nameMatches(r.b, q),
      );

  return { status: "ok", from: f.name, to: t.name, direct, transfers };
}