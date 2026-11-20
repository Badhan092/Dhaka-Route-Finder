// Pure config + input parsing. Safe for client and server.

export const PER_PAGE = 12;
export const TYPE_OPTIONS = ["Semi-Sitting", "AC", "Regular", "Local", "Circular"];

// Only routes with a direct bus service are shown.
export const SUGGESTED_ROUTES = [
  ["Mirpur 10", "Motijheel"],
  ["Gabtoli", "Gulistan"],
  ["Mohammadpur", "Kuril Bishwa Road"],
  ["Azimpur", "Airport"],
  ["Farmgate", "Airport"],
  ["Mirpur 1", "Kalshi"],
];

export const TYPE_GROUPS = [
  { label: "Semi-Sitting", filter: "Semi-Sitting" },
  { label: "Regular", filter: "Regular" },
  { label: "AC services", filter: "AC" },
  { label: "Local service", filter: "Local" },
  { label: "Circular", filter: "Circular" },
];

const clean = (value, max = 80) => {
  const str = Array.isArray(value) ? value[0] : value;
  return typeof str === "string" ? str.trim().slice(0, max) : "";
};

/** Sanitize query params: trim, cap length, whitelist `type`, clamp `page`. */
export function parseQuery(query) {
  const type = clean(query.type);

  return {
    filters: {
      q: clean(query.q),
      stop: clean(query.stop),
      type: TYPE_OPTIONS.includes(type) ? type : "",
    },
    page: Math.max(1, parseInt(clean(query.page, 6), 10) || 1),
  };
}
