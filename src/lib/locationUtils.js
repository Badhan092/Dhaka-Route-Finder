import { DHAKA_BUS_STOPS_GEO } from './locationCoordinates';

const ALIASES = {
  sonyhall: 'sonycinemahall',
  mirpursonycinemahall: 'sonycinemahall',
  shiamasjid: 'shiamosque',
  chiriyakhanamirpurzoo: 'chiriyakhana',
  mirpurzoochiriyakhana: 'chiriyakhana',
};

export const rawKey = (s = '') =>
  s.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{M}\p{N}]+/gu, '');

export const stopKey = (s) => {
  const k = rawKey(s);
  return ALIASES[k] ?? k;
};

// Loose key for bus name matching (drops vowels so "Paribahon" and "Paribahan" match)
const looseKey = (k) => k.replace(/[aeiouyh]/g, '');

export function nameMatches(bus, q) {
  const k = rawKey(q);
  if (!k) return true;
  const en = rawKey(bus.name || bus.name_en || '');
  if (en.includes(k) || rawKey(bus.bn || bus.name_bn || '').includes(k)) return true;
  const l = looseKey(k);
  return l.length >= 3 && looseKey(en).includes(l);
}

export function resolveGeoStop(stopName) {
  if (!stopName) return null;
  const direct = DHAKA_BUS_STOPS_GEO[stopName];
  if (direct) return direct;

  const k = stopKey(stopName);
  for (const [name, data] of Object.entries(DHAKA_BUS_STOPS_GEO)) {
    if (stopKey(name) === k || stopKey(data.bn) === k) return data;
  }
  return null;
}
