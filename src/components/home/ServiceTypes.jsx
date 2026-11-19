import Link from "next/link";
import { ArrowUpRight, Armchair, Bus, Repeat, Route, Snowflake } from "lucide-react";
import SectionHead from "./SectionHead";

const ICONS = { "Semi-Sitting": Armchair, Regular: Bus, "AC services": Snowflake, "Local service": Route, Circular: Repeat };
// Full class strings so Tailwind can see them.
const THEMES = [
  { chip: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500", hover: "hover:border-emerald-400" },
  { chip: "bg-sky-100 text-sky-700", bar: "bg-sky-500", hover: "hover:border-sky-400" },
  { chip: "bg-violet-100 text-violet-700", bar: "bg-violet-500", hover: "hover:border-violet-400" },
  { chip: "bg-amber-100 text-amber-700", bar: "bg-amber-500", hover: "hover:border-amber-400" },
  { chip: "bg-rose-100 text-rose-700", bar: "bg-rose-500", hover: "hover:border-rose-400" },
];

// types: [{ label, filter, n }] counted from each bus's service-type text. A bus can match several.
export default function ServiceTypes({ types }) {
  const max = Math.max(...types.map((t) => t.n), 1);
  return (
    <section aria-labelledby="types" className="mt-16">
      <SectionHead id="types" eyebrow="Explore" title="Browse by service type" subtitle="Bars compare each type with the largest one. A bus can list more than one type, so counts overlap." />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {types.map((t, i) => {
          const theme = THEMES[i % THEMES.length];
          const Icon = ICONS[t.label] || Bus;
          return (
            <Link
              key={t.label}
              href={{ pathname: "/buses", query: { type: t.filter } }}
              className={`group relative flex flex-col bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-0.5 transition-all duration-200 ${theme.hover}`}
            >
              <div className="flex items-start justify-between">
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl ${theme.chip}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700 transition-colors" aria-hidden="true" />
              </div>
              <p className="mt-4 font-bold text-slate-900">{t.label}</p>
              <p className="text-sm text-slate-500"><span className="text-xl font-extrabold text-slate-900">{t.n}</span> {t.n === 1 ? "bus" : "buses"}</p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden" aria-hidden="true">
                <div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${Math.max(8, Math.round((t.n / max) * 100))}%` }} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}