import React from "react";
import Link from "next/link";

import { ArrowUpRight, BusFront, MapPin, MoveUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { convertToBanglaNumber } from "@/utils/convertToBanglaNumber";


/* -------------------------------------------------------------------------- */
/* Themes (full class strings so Tailwind can see them)                       */
/* -------------------------------------------------------------------------- */

const THEMES = {
  featured: {
    card: "border-emerald-900 bg-[#082F25] text-white hover:shadow-emerald-950/20",
    ringOuter: "border-emerald-400/10",
    ringInner: "border-emerald-300/20",
    pin: "bg-emerald-400 text-[#082F25]",
    eyebrow: "text-emerald-300",
    arrow: "border-white/15 bg-white/10 text-white",
    title: "text-white",
    subtitle: "text-emerald-100/65",
    count: "text-emerald-300",
    unit: "text-emerald-100/60",
    note: "text-emerald-100/50",
    busIcon: "bg-white/10 text-emerald-300",
    track: "bg-white/10",
    fill: "bg-emerald-300",
    divider: "border-white/10",
    servicesLabel: "text-emerald-100/50",
    more: "text-emerald-300",
    chip: "bg-white/10 text-emerald-50",
    cta: "text-emerald-300",
  },
  default: {
    card: "border-slate-200 bg-white text-slate-900 hover:border-emerald-300 hover:shadow-emerald-950/5",
    ringOuter: "border-emerald-50",
    ringInner: "border-emerald-200",
    pin: "bg-emerald-50 text-emerald-700",
    eyebrow: "text-slate-400",
    arrow:
      "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    title: "text-slate-900",
    subtitle: "text-slate-500",
    count: "text-emerald-700",
    unit: "text-slate-400",
    note: "text-slate-400",
    busIcon: "bg-emerald-50 text-emerald-700",
    track: "bg-slate-100",
    fill: "bg-emerald-500",
    divider: "border-slate-100",
    servicesLabel: "text-slate-400",
    more: "text-emerald-700",
    chip: "border border-slate-100 bg-slate-50 text-slate-600",
    cta: "text-emerald-700",
  },
};


const HubCard = ({ hub, index, max }) => {

  const { t, language } = useLanguage();
  const MAX_SAMPLES = 3;

  const isBn = language === "bn";
  const fmt = (n) => (isBn ? convertToBanglaNumber(n) : n);

  const theme = THEMES[index === 0 ? "featured" : "default"];
  const samples = hub.sample || [];
  const percentage = Math.round((hub.n / max) * 100);
  const remaining = Math.max(0, hub.n - samples.length);
  const rank = String(index + 1).padStart(2, "0");

  const hubName = t(hub.name);
  const ariaLabel = t("hubs.ariaLabel").replace("{n}", fmt(hub.n)).replace("{name}", hubName);

  return (
    <Link
      href={{ pathname: "/buses", query: { stop: hub.name } }}
      aria-label={ariaLabel}
      className={`group relative isolate flex min-h-[280px] flex-col overflow-hidden rounded-[28px] border p-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl sm:p-6 ${theme.card}`}
    >
      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className={`absolute -right-12 -top-16 h-48 w-48 rounded-full border-[28px] transition-transform duration-500 group-hover:scale-110 ${theme.ringOuter}`}
      />
      <div
        aria-hidden="true"
        className={`absolute -right-4 top-10 h-32 w-32 rounded-full border border-dashed ${theme.ringInner}`}
      />

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${theme.pin}`}>
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${theme.eyebrow}`}>
            {t("Transit hub")} / {fmt(rank)}
          </span>
        </div>

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 ${theme.arrow}`}
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      {/* Hub name */}
      <div className="relative z-10 mt-7">
        <h3 className={`text-2xl font-extrabold leading-tight tracking-tight sm:text-[28px] ${theme.title}`}>
          {hubName}
        </h3>
        <p className={`mt-1.5 text-sm ${theme.subtitle}`}>{t("Major bus interchange")}</p>
      </div>

      {/* Bus count + activity bar */}
      <div className="relative z-10 mt-auto pt-7">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-black tabular-nums tracking-[-0.06em] ${theme.count}`}>
                {fmt(hub.n)}
              </span>
              <span className={`text-xs font-semibold ${theme.unit}`}>
                {hub.n === 1 ? t("bus") : t("buses")}
              </span>
            </div>
            <p className={`mt-1 text-xs ${theme.note}`}>{t("Serving this location")}</p>
          </div>

          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.busIcon}`}>
            <BusFront className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className={`mt-4 h-1.5 w-full overflow-hidden rounded-full ${theme.track}`} aria-hidden="true">
          <div
            className={`h-full rounded-full transition-all duration-700 ${theme.fill}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Sample bus services */}
      <div className={`relative z-10 mt-5 border-t pt-4 ${theme.divider}`}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-wider ${theme.servicesLabel}`}>
            {t("Available services")}
          </span>

          {remaining > 0 && (
            <span className={`whitespace-nowrap text-[10px] font-semibold ${theme.more}`}>
              {t("hubs.more").replace("{n}", fmt(remaining))}
            </span>
          )}
        </div>

        <div className="flex w-full min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap">
          {samples.slice(0, MAX_SAMPLES).map((name) => (
            <span
              key={name}
              title={name}
              className={`min-w-0 max-w-[33.33%] shrink truncate rounded-lg px-2.5 py-1.5 text-[11px] font-semibold ${theme.chip}`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Hover action */}
      <div
        className={`absolute bottom-5 right-5 z-20 flex translate-y-2 items-center gap-1.5 text-xs font-bold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${theme.cta}`}
      >
        {t("Explore buses")}
        <MoveUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
    </Link>
  );
};

export default HubCard;