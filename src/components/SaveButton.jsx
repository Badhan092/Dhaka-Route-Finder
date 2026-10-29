'use client';

import { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { getSaved, toggleSaved } from '@/lib/storage';

export default function SaveButton({ item, className = '' }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (item?.id) {
      setIsSaved(getSaved().some((x) => x.id === item.id));
    }
  }, [item?.id]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleSaved(item);
    setIsSaved(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isSaved}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
        isSaved
          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
          : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-700'
      } ${className}`}
    >
      {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </button>
  );
}
