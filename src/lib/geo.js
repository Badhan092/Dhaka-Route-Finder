// Stop coordinates: src/data/stopCoordinates.json (from the Gemini prototype). They are approximate, and
// only ~40% of stops have one. Add more entries there; matching uses the same normalised stop key.
import coords from '@/data/stopCoordinates.json';
import { stopKey } from './locationUtils';

const GEO = new Map(Object.entries(coords).map(([name, v]) => [stopKey(name), v]));

// Returns only the stops that have coordinates, keeping their index in the given list.
export const mapPoints = (stops) =>
  stops.flatMap((name, i) => {
    const g = GEO.get(stopKey(name));
    return g ? [{ i, name, lat: g.lat, lng: g.lng, bn: g.bn }] : [];
  });
