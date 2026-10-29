const read = (k) => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(k)) || [];
  } catch {
    return [];
  }
};

const write = (k, v) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

export const getSaved = () => read('dbf:saved');

export function toggleSaved(item) {
  const list = getSaved();
  const has = list.some((x) => x.id === item.id);
  const updated = has ? list.filter((x) => x.id !== item.id) : [item, ...list];
  write('dbf:saved', updated);
  return !has;
}

export const getRecent = () => read('dbf:recent');

export function pushRecent(r) {
  if (!r.from || !r.to) return;
  const recent = getRecent().filter(
    (x) => !(x.from === r.from && x.to === r.to)
  );
  write('dbf:recent', [r, ...recent].slice(0, 5));
}
