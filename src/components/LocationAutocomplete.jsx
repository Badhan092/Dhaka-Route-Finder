'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Check } from 'lucide-react';
import { DHAKA_BUS_STOPS_GEO } from '@/lib/locationCoordinates';
import { stopKey } from '@/lib/locationUtils';

export default function LocationAutocomplete({
  name,
  label,
  value,
  onChange,
  placeholder,
  stops = [],
}) {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = stops
    .filter((stopItem) => {
      const stopName = typeof stopItem === 'string' ? stopItem : stopItem.name;
      const cleanQ = query.toLowerCase().trim();
      const bnName = DHAKA_BUS_STOPS_GEO[stopName]?.bn || '';
      return (
        stopName.toLowerCase().includes(cleanQ) ||
        bnName.includes(cleanQ) ||
        stopKey(stopName).includes(cleanQ)
      );
    })
    .slice(0, 8);

  const handleSelect = (stopItem) => {
    const stopName = typeof stopItem === 'string' ? stopItem : stopItem.name;
    setQuery(stopName);
    if (onChange) onChange(stopName);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <MapPin className="absolute left-3.5 w-4 h-4 text-emerald-600 pointer-events-none" />
        <input
          type="text"
          name={name}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onChange) onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm transition-all shadow-sm"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-100">
          {suggestions.map((item, idx) => {
            const stopName = typeof item === 'string' ? item : item.name;
            const count = typeof item === 'object' ? item.n : null;
            const bn = DHAKA_BUS_STOPS_GEO[stopName]?.bn;
            const isSelected = stopName.toLowerCase() === (value || '').toLowerCase();

            return (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
                className="px-4 py-2.5 hover:bg-emerald-50 cursor-pointer flex items-center justify-between text-sm transition-colors"
              >
                <div>
                  <span className="font-medium text-slate-900">{stopName}</span>
                  {bn && <span className="ml-2 text-xs text-slate-500">({bn})</span>}
                </div>
                <div className="flex items-center gap-2">
                  {count && (
                    <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                      {count} buses
                    </span>
                  )}
                  {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
