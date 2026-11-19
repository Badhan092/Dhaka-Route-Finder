import { ArrowRight, Bookmark, Route, Search } from "lucide-react";
import SectionHead from "./SectionHead";

const STEPS = [
  [Search, "Search", "Enter where you are and where you’re going. Suggestions come from stops in the route data."],
  [Route, "Compare", "See buses that serve both stops, with the stops along your segment, or options with one change."],
  [Bookmark, "Save & go", "Open the full route, then save the trips you take often."],
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how" className="mt-16">
      <SectionHead id="how" eyebrow="Simple" title="How it works" subtitle="Three steps from “where?” to “which bus?”" />
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STEPS.map(([Icon, title, text], i) => (
          <li
            key={title}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-600/25 group-hover:scale-105 transition-transform">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Step {i + 1}</span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{text}</p>
            {i < STEPS.length - 1 && (
              <span className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-slate-200 text-emerald-600 shadow-sm" aria-hidden="true">
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}