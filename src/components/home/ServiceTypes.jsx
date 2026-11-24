import Link from "next/link";

import SectionHead from "./SectionHead";
import { ArrowUpRight, Armchair, Bus, Repeat, Route, Snowflake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { convertToBanglaNumber } from "@/utils/convertToBanglaNumber";



const ICONS = { "Semi-Sitting": Armchair, Regular: Bus, "AC services": Snowflake, "Local service": Route, Circular: Repeat,};

// Full class strings so Tailwind can see them.
const THEMES = [
  { chip: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500", hover: "hover:border-emerald-400" },
  { chip: "bg-sky-100 text-sky-700", bar: "bg-sky-500", hover: "hover:border-sky-400" },
  { chip: "bg-violet-100 text-violet-700", bar: "bg-violet-500", hover: "hover:border-violet-400" },
  { chip: "bg-amber-100 text-amber-700", bar: "bg-amber-500", hover: "hover:border-amber-400" },
  { chip: "bg-rose-100 text-rose-700", bar: "bg-rose-500", hover: "hover:border-rose-400" },
];


const ServiceTypes = ({ types }) => {
  
  const { t, language } = useLanguage();
  const isBn = language === "bn";
  const fmt = (n) => (isBn ? convertToBanglaNumber(n) : n);
  const max = Math.max(...types.map((type) => type.n), 1);

  return (
    <section aria-labelledby="types" className="mt-16">
      <SectionHead
        id="types"
        eyebrow={t("Explore")}
        title={t("Browse by service type")}
        subtitle={t(
          "Bars compare each type with the largest one. A bus can list more than one type, so counts overlap."
        )}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {types.map((type, i) => {
          const theme = THEMES[i % THEMES.length];
          const Icon = ICONS[type.label] || Bus;

          return (
            <Link
              key={type.label}
              href={{ pathname: "/buses", query: { type: type.filter } }}
              className={`group relative flex flex-col rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5 sm:p-5 ${theme.hover}`}
            >
              <div className="flex items-start justify-between">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${theme.chip}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-slate-300 transition-colors group-hover:text-slate-700"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-4 font-bold text-slate-900">{t(type.label)}</p>

              <p className="text-sm text-slate-500">
                <span className="text-xl font-extrabold text-slate-900">
                  {fmt(type.n)}
                </span>{" "}
                {type.n === 1 ? t("bus") : t("buses")}
              </p>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                <div
                  className={`h-full rounded-full ${theme.bar}`}
                  style={{ width: `${Math.max(8, Math.round((type.n / max) * 100))}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceTypes;