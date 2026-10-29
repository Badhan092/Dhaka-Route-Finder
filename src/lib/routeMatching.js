import { stopKey, nameMatches } from './locationUtils';

export function segment(bus, fromKey, toKey) {
  const k = bus.stopKeys;
  let best = null;

  k.forEach((a, i) => {
    if (a !== fromKey) return;
    k.forEach((b, j) => {
      if (b !== toKey) return;
      const d = Math.abs(i - j);
      if (d && (!best || d < best.count)) {
        best = { i, j, count: d };
      }
    });
  });

  if (!best) return null;
  const s = bus.stops.slice(Math.min(best.i, best.j), Math.max(best.i, best.j) + 1);
  return {
    count: best.count,
    forward: best.i < best.j,
    stops: best.i < best.j ? s : [...s].reverse(),
  };
}

export function findDirect(buses, fromKey, toKey) {
  return buses
    .map((bus) => ({ bus, seg: segment(bus, fromKey, toKey) }))
    .filter((r) => r.seg);
}

export function findTransfers(buses, fromKey, toKey, limit = 6) {
  const A = buses.filter((b) => b.stopKeys.includes(fromKey) && !b.stopKeys.includes(toKey));
  const B = buses.filter((b) => b.stopKeys.includes(toKey) && !b.stopKeys.includes(fromKey));
  const out = [];

  for (const a of A) {
    for (const b of B) {
      let best = null;
      for (const key of new Set(a.stopKeys)) {
        if (!b.stopKeys.includes(key)) continue;
        const s1 = segment(a, fromKey, key);
        const s2 = segment(b, key, toKey);
        if (!s1 || !s2) continue;
        const total = s1.count + s2.count;
        if (!best || total < best.total) {
          best = { s1, s2, total };
        }
      }
      if (best) {
        out.push({ a, b, ...best, at: best.s1.stops[best.s1.stops.length - 1] });
      }
    }
  }

  return out.sort((x, y) => x.total - y.total).slice(0, limit);
}

export function calculateEstimatedFare(bus, stopCount) {
  if (bus.type?.toLowerCase().includes('flat')) {
    return '৳20 (Fixed Flat Fare)';
  }
  const min = bus.min_fare || 10;
  const max = bus.max_fare || 45;
  if (stopCount <= 3) return `৳${min} (BRTA Minimum Fare)`;
  const approx = Math.min(max, min + Math.round((stopCount - 3) * 2.5));
  return `Approx ৳${approx} (৳${min} - ৳${max} range)`;
}
