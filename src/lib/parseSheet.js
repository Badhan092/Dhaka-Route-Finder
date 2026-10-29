// Parses TSV or CSV exports from Google Sheets.
// Supports both tab-separated (TSV) and comma-separated (CSV) routes.
export function parseSheet(text) {
  if (!text) return [];
  const clean = text.replace(/\r/g, '').trim();
  const isTSV = clean.includes('\t');
  const lines = clean.split('\n');

  return lines
    .map((l) => {
      if (isTSV) {
        return l.split('\t').map((c) => c.trim().replace(/^"|"$/g, ''));
      }
      return l.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
    })
    .filter((r) => /^\d+$/.test(r[0] || '') && r[1] && r[5])
    .map(([sl, name, bn, image, type, route]) => ({
      id: Number(sl),
      name: name.trim(),
      name_en: name.trim(),
      bn: (bn || '').trim(),
      name_bn: (bn || '').trim(),
      image: /^https?:\/\//.test(image) ? image.trim() : null,
      type: type || 'Regular / Semi-Sitting',
      service_type: type || 'Regular / Semi-Sitting',
      stops: route.split(/\s*(?:⇄|;|->|→)\s*/).map((s) => s.trim()).filter(Boolean),
      direction: 'both'
    }));
}
