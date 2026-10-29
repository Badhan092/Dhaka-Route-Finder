import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import BusImage from './BusImage';
import FareBadge from './FareBadge';
import SaveButton from './SaveButton';

export default function BusCard({ bus }) {
  const firstStop = bus.stops[0];
  const lastStop = bus.stops[bus.stops.length - 1];

  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between">
      <div>
        {bus.image && (
          <div className="mb-4">
            <BusImage src={bus.image} alt={bus.name} />
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-100">
            {bus.type || bus.service_type}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {bus.stops.length} Stops
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600">
          <Link href={`/buses/${bus.slug}`} className="hover:text-emerald-600 transition-colors">
            {bus.name}
          </Link>
        </h3>
        {bus.bn && (
          <p className="text-xs text-emerald-700 font-medium mb-3">
            {bus.bn}
          </p>
        )}

        <div className="text-xs text-slate-600 space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{firstStop}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{lastStop}</span>
          </div>
          <p className="text-slate-500 line-clamp-1 pl-5 text-[11px]">
            Via {bus.stops.slice(1, 4).join(', ')}...
          </p>
        </div>

        <div className="mb-3">
          <FareBadge fareText={bus.fare_text} />
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <SaveButton item={{ id: bus.slug, label: bus.name, href: `/buses/${bus.slug}` }} />
        <Link
          href={`/buses/${bus.slug}`}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          View Route ➔
        </Link>
      </div>
    </article>
  );
}
