import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import BusImage from "./BusImage";
import FareBadge from "../FareBadge";
import SaveButton from "../SaveButton";
import { useLanguage } from "@/context/LanguageContext";
import { convertToBanglaNumber } from "@/utils/convertToBanglaNumber";

const MAX_VIA_STOPS = 3;

const BusCard = ({ bus }) => {
  const { t, language } = useLanguage();

  const isBn = language === "bn";
  const fmt = (n) => (isBn ? convertToBanglaNumber(n) : n);

  const stops = bus.stops || [];
  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];
  const viaStops = stops.slice(1, 1 + MAX_VIA_STOPS);
  const hasMoreStops = stops.length > 1 + MAX_VIA_STOPS + 1;

  // Show the Bangla name as the title in Bangla mode, English otherwise
  const title = isBn && bus.bn ? bus.bn : bus.name;
  const subtitle = isBn ? bus.name : bus.bn;

  const href = `/buses/${bus.slug}`;
  const type = bus.type || bus.service_type;

  const viaText = t("busCard.via").replace(
    "{stops}",
    viaStops.map((stop) => t(stop)).join(", ") + (hasMoreStops ? "…" : "")
  );

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-md">
      <div>
        {bus.image && (
          <div className="mb-4">
            <BusImage src={bus.image} alt={title} />
          </div>
        )}

        <div className="mb-2 flex items-center justify-between gap-2">
          {type && (
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              {t(type)}
            </span>
          )}
          <span className="text-xs font-medium text-slate-500">
            {t("busCard.stops").replace("{n}", fmt(stops.length))}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
          <Link href={href}>{title}</Link>
        </h3>

        {subtitle && (
          <p className="mb-3 text-xs font-medium text-emerald-700">{subtitle}</p>
        )}

        {stops.length > 0 && (
          <div className="mb-4 space-y-1.5 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span className="truncate">{t(firstStop)}</span>
              <ArrowRight className="h-3 w-3 shrink-0 text-slate-400" aria-hidden="true" />
              <span className="truncate">{t(lastStop)}</span>
            </div>

            {viaStops.length > 0 && (
              <p className="line-clamp-1 pl-5 text-[11px] text-slate-500">{viaText}</p>
            )}
          </div>
        )}

        <div className="mb-3">
          <FareBadge fareText={bus.fare_text} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <SaveButton item={{ id: bus.slug, label: bus.name, href }} />
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
        >
          {t("View Route")}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

export default BusCard;