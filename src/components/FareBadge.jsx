import { Banknote } from 'lucide-react';

export default function FareBadge({ fareText }) {
  const isAvailable = fareText && !fareText.toLowerCase().includes('unavailable');

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isAvailable
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          : 'bg-slate-100 text-slate-600 border border-slate-200'
      }`}
    >
      <Banknote className="w-3.5 h-3.5" />
      <span>{fareText || 'BRTA Distance Fare'}</span>
    </div>
  );
}
