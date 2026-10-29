'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeftRight, Search } from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';
import { pushRecent } from '@/lib/storage';

export default function HeroSearch({ allStops = [] }) {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to) return;
    pushRecent({ from, to });
    router.push(`/routes?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <LocationAutocomplete
            label="Starting Location (যেখান থেকে)"
            placeholder="e.g. Mirpur 10, Farmgate..."
            value={from}
            onChange={setFrom}
            stops={allStops}
          />
        </div>

        <button
          type="button"
          onClick={handleSwap}
          title="Swap Locations"
          className="p-2.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-emerald-600 transition-colors mt-4 lg:mt-5 self-center border border-slate-200 shadow-sm"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        <div className="flex-1 w-full">
          <LocationAutocomplete
            label="Destination (যেখানে যাবেন)"
            placeholder="e.g. Motijheel, Airport..."
            value={to}
            onChange={setTo}
            stops={allStops}
          />
        </div>

        <button
          type="submit"
          disabled={!from || !to}
          className="w-full lg:w-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl shadow-md shadow-emerald-700/10 flex items-center justify-center gap-2 transition-all mt-4 lg:mt-5 text-sm"
        >
          <Search className="w-4 h-4" />
          <span>Find Buses</span>
        </button>
      </form>
    </div>
  );
}
