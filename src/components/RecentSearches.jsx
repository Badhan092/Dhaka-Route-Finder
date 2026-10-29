'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import { getRecent } from '@/lib/storage';

export default function RecentSearches() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecent());
  }, []);

  if (!items.length) {
    return <p className="text-xs text-slate-400">Your recent searches will appear here.</p>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((r, idx) => (
        <Link
          key={idx}
          href={`/routes?from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-full text-xs font-medium text-slate-700 transition-colors shadow-sm"
        >
          <History className="w-3.5 h-3.5 text-slate-400" />
          <span>{r.from} ➔ {r.to}</span>
        </Link>
      ))}
    </div>
  );
}
