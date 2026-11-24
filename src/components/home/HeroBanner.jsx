import React from "react";
import { Bus, MapPin, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { convertToBanglaNumber } from "@/utils/convertToBanglaNumber";

const pill = "flex items-center gap-2 bg-white/85 px-3.5 py-2 rounded-xl border border-emerald-900/15 shadow-sm";

const badges = [
  { Icon: MapPin, color: "text-rose-600", label: "All DMP Corridors" },
  { Icon: Compass, color: "text-amber-600", label: "Verified Stoppages" },
];

const HeroBanner = ({ filteredCount }) => {

  const { t, language } = useLanguage();
  const isBn = language === "bn";
  const fmt = (n) => (isBn ? convertToBanglaNumber(n) : n);

  return (
    <section className="relative isolate mb-8 overflow-hidden rounded-3xl border border-emerald-900/15 bg-gradient-to-br from-[#f8f3ea] via-[#f2ece3] to-emerald-50 p-6 text-emerald-950 sm:p-10 md:min-h-[320px]">
      
      {/* Dhaka City Outline - Right Center */}
      <img
        src="/images/dhaka-outline.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute right-0 top-20 h-auto w-[100%] max-w-[680px] -translate-y-[40%] select-none object-contain opacity-50"
      />

      {/* Gradient Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#f8f3ea]/95 via-[#f2ece3]/20 to-emerald-50/35"
      />

      {/* Decorative Emerald Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 z-[2] h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
      />

      {/* Bus Image - Over Dhaka Outline */}
      <img
        src="/images/brtc-bus.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute right-[10%] top-[180px] z-[3] hidden h-[195px] w-auto -translate-y-[42%] select-none object-contain md:block lg:h-[245px]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-800/25 bg-emerald-800/10 px-3 py-1 text-xs font-semibold text-emerald-900">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-600" />
          {t("Dhaka City Transit • Dhaka Bus Directory")}
        </span>

        <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {t("hero.titleBefore")}{" "}
          <span className="text-emerald-700">{t("hero.titleHighlight")}</span>{" "}
          {t("hero.titleAfter")}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
          {t("hero.description")}
        </p>

        {/* Statistics & Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium">
          <div className={`${pill} text-emerald-900`}>
            <Bus className="h-4 w-4 text-emerald-700" />
            <span>
              {t("Showing")}{" "}
              <strong className="font-bold">{fmt(filteredCount)}</strong>{" "}
              {t("buses")}
            </span>
          </div>

          {badges.map(({ Icon, color, label }) => (
            <div key={label} className={`${pill} text-slate-700`}>
              <Icon className={`h-4 w-4 ${color}`} />
              <span>{t(label)}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeroBanner;