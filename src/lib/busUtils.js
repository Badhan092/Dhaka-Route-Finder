// Pure helpers: NO fs / server-only imports here, so this file is safe to
// import from pages and components (client bundle included).
import { nameMatches, stopKey } from "./locationUtils";
import { PER_PAGE, SUGGESTED_ROUTES, TYPE_GROUPS } from "./busDirectory";

// Unique stops with the number of buses serving each.
export function getStops(buses) {
  const m = new Map();

  for (const b of buses) {
    const seen = new Set();

    b.stops.forEach((name, i) => {
      const key = b.stopKeys[i];
      const e = m.get(key) ?? { key, names: {}, n: 0 };

      e.names[name] = (e.names[name] || 0) + 1;

      if (!seen.has(key)) {
        e.n++;
        seen.add(key);
      }

      m.set(key, e);
    });
  }

  return [...m.values()]
    .map((e) => ({
      key: e.key,
      n: e.n,
      name: Object.entries(e.names).sort((a, b) => b[1] - a[1])[0][0],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Buses sharing more than one stop with the given bus.
export function getRelated(buses, bus, limit = 6) {
  const mine = new Set(bus.stopKeys);

  return buses
    .filter((b) => b.slug !== bus.slug)
    .map((b) => ({
      bus: b,
      shared: new Set(b.stopKeys.filter((k) => mine.has(k))).size,
    }))
    .filter((r) => r.shared > 1)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit);
}

/** ----------------------------
 * directory
 * ------------------------------ **/


export const matchesBusType = (bus, type) =>
  !type || (bus.type || "").toLowerCase().includes(type.toLowerCase());

/** Filter by name, stop and service type; sorted A–Z. */
export function filterBuses(buses, { q, stop, type }) {
  const selectedStop = stop ? stopKey(stop) : "";

  return buses
    .filter(
      (bus) =>
        nameMatches(bus, q) &&
        (!selectedStop || (bus.stopKeys || []).includes(selectedStop)) &&
        matchesBusType(bus, type),
    )
    .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true, sensitivity: "base" }));
}

export function paginate(items, requestedPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const start = (currentPage - 1) * PER_PAGE;

  return { currentPage, totalPages, pagedItems: items.slice(start, start + PER_PAGE) };
}

/** Homepage stats, derived entirely from the dataset. `stops` comes from getStops(). */
export function getHomeData(buses, stops, findDirect) {
  const stopByName = new Map(stops.map((s) => [s.name.toLowerCase(), s]));

  const commutes = SUGGESTED_ROUTES.flatMap(([fromName, toName]) => {
    const from = stopByName.get(fromName.toLowerCase());
    const to = stopByName.get(toName.toLowerCase());

    return from && to && findDirect(buses, from.key, to.key).length
      ? [{ from: from.name, to: to.name }]
      : [];
  });

  const types = TYPE_GROUPS.map(({ label, filter }) => ({
    label,
    filter,
    n: buses.filter((bus) => matchesBusType(bus, filter)).length,
  })).filter((t) => t.n > 0);

  // getStops already counts buses per stop (`n`), so only the top 6 need sample names.
  const hubs = [...stops]
    .sort((a, b) => b.n - a.n)
    .slice(0, 6)
    .map(({ key, name, n }) => ({
      key,
      name,
      n,
      sample: buses
        .filter((bus) => bus.stopKeys.includes(key))
        .slice(0, 3)
        .map((bus) => bus.name),
    }));

  const longestStops = buses.reduce((max, bus) => Math.max(max, bus.stops.length), 0);

  return { stopsCount: stops.length, longestStops, commutes, types, hubs };
}
