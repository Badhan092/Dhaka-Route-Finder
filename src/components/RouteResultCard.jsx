'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import FareBadge from './FareBadge';
import RouteTimeline from './RouteTimeline';
import SaveButton from './SaveButton';
import { calculateEstimatedFare } from '@/lib/routeMatching';

export default function RouteResultCard({ bus, seg, from, to }) {
  const fare = calculateEstimatedFare(bus, seg.count);
  const q = new URLSearchParams({ from, to });

  return (
    <article className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500/50 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-900 text-lg">
              <Link href={`/buses/${bus.slug}`} className="hover:text-emerald-600 transition-colors">
                {bus.name}
              </Link>
            </h3>
            {bus.bn && (
              <span className="text-xs text-slate-500 font-normal">({bus.bn})</span>
            )}
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold rounded-full">
              Direct Service
            </span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
              {bus.type || bus.service_type}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Full Terminal Route: {bus.stops[0]} ⇄ {bus.stops[bus.stops.length - 1]}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FareBadge fareText={fare} />
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
          <span className="text-emerald-700 font-bold">{seg.stops[0]}</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="text-emerald-700 font-bold">{seg.stops[seg.stops.length - 1]}</span>
          <span className="text-xs text-slate-500 font-normal ml-2 bg-slate-100 px-2 py-0.5 rounded-full">
            {seg.count} {seg.count === 1 ? 'stop' : 'stops'} on segment
          </span>
        </div>

        <details className="mt-3 group">
          <summary className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer list-none flex items-center gap-1 select-none">
            <ChevronRight className="w-3.5 h-3.5 group-open:rotate-90 transition-transform" />
            <span>Show intermediate stops ({seg.stops.length})</span>
          </summary>
          <div className="pt-3 pl-2">
            <RouteTimeline stops={seg.stops} />
          </div>
        </details>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <SaveButton
          item={{
            id: `${bus.slug}|${from}|${to}`,
            label: `${bus.name}: ${from} → ${to}`,
            href: `/routes?${q}`,
          }}
        />
        <Link
          href={`/buses/${bus.slug}`}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          View Bus Details & Map <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
