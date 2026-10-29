// FARES: src/data/fares.json (keyed by bus slug). These are NOT in the spreadsheet; they were carried over
// from the Gemini prototype and are UNVERIFIED. Buses without an entry have no fare ("Fare information unavailable").
import fares from '@/data/fares.json';

export const FARE_TYPES = { segmented: 'Distance-based range', premium: 'Premium AC range', flat: 'Flat fare' };

export const getFare = (slug) => (fares[slug] ? { ...fares[slug], verified: false } : null);

export const fareLabel = (fare) => (fare.type === 'flat' || fare.min === fare.max ? `৳${fare.min}` : `৳${fare.min}–${fare.max}`);

// Heuristic ported from the Gemini prototype. NOT an official fare table: it assumes roughly ৳2.5 per
// stop beyond the first 3, capped at the bus's max. Always shown as an estimate.
export function estimateFare(fare, stopCount) {
  if (!fare) return null;
  if (fare.type === 'flat') return { amount: fare.min, kind: 'flat' };
  if (stopCount <= 3) return { amount: fare.min, kind: 'min' };
  return { amount: Math.min(fare.max, fare.min + Math.round((stopCount - 3) * 2.5)), kind: 'estimate' };
}
