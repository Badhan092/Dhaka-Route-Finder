import { Info, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHead from "@/components/Layouts/SectionHead";


// Answers stay true whatever fare labels the cards show: the route spreadsheet has no fare column.
const QA = [
  ["Does each bus run in both directions?", "The route data lists every bus with a two-way arrow and has no one-way information, so routes are treated as running both ways. Check locally if a service is one-way."],
  ["How reliable are the fares?", "The route spreadsheet has no fares. Any fare shown is approximate and unverified, so confirm with the conductor."],
  ["What does “direct” mean?", "A direct result is a single bus that lists both of your stops. Journeys that need a change of bus are shown separately, with the transfer stop."],
  ["Are schedules and travel times included?", "No. The data has stop sequences only, so there are no timetables, operating hours or travel-time estimates."],
  ["Why can’t I find my stop?", "Only stops that appear in the route data can be searched. Try a nearby or better-known stop, or check the spelling."],
];

const Faq = () => {

  const {t, language} = useLanguage();

  return (
    <section aria-labelledby="faq" className="mt-16 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-12">
      <div>
        <SectionHead id="faq" eyebrow="FAQ" title="Good to know" subtitle="What the data does and doesn’t cover." />
        <div className="flex gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
          <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm leading-relaxed">Route data comes from a community-compiled spreadsheet and may be out of date. Check locally before you travel.</p>
        </div>
      </div>

      <div className="space-y-3">
        {QA.map(([q, a]) => (
          <details key={q} className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm open:border-emerald-300 open:shadow-lg open:shadow-emerald-900/5 transition-all">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
              {t(q)}
              <span className="inline-flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-emerald-50 text-emerald-700 group-open:bg-emerald-600 group-open:text-white transition-colors">
                <Plus className="w-4 h-4 transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
              </span>
            </summary>
            <p className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-slate-600">{t(a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}


export default Faq;