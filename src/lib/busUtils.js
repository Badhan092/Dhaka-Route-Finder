// Pure helpers: NO fs / server-only imports here, so this file is safe to
// import from pages and components (client bundle included).

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
