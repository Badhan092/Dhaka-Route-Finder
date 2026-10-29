'use client';

import { useState } from 'react';
import RouteTimeline from './RouteTimeline';

export default function StopSegment({ stops = [] }) {
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(Math.max(0, stops.length - 1));

  const min = Math.min(fromIdx, toIdx);
  const max = Math.max(fromIdx, toIdx);
  let segment = stops.slice(min, max + 1);
  if (fromIdx > toIdx) segment.reverse();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Board at
          </label>
          <select
            value={fromIdx}
            onChange={(e) => setFromIdx(Number(e.target.value))}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
          >
            {stops.map((s, i) => (
              <option key={i} value={i}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Get off at
          </label>
          <select
            value={toIdx}
            onChange={(e) => setToIdx(Number(e.target.value))}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-emerald-600"
          >
            {stops.map((s, i) => (
              <option key={i} value={i}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {fromIdx === toIdx ? (
        <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
          Pick two different stops to view the segment.
        </p>
      ) : (
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-500 mb-3">
            {segment.length - 1} stops between <span className="text-emerald-700 font-bold">{segment[0]}</span> and{' '}
            <span className="text-emerald-700 font-bold">{segment[segment.length - 1]}</span>
          </p>
          <RouteTimeline stops={segment} />
        </div>
      )}
    </div>
  );
}
