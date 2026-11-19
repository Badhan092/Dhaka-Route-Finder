import Link from "next/link";
import { Bookmark, Check, Compass } from "lucide-react";

const POINTS = ["No account needed", "Saved in this browser", "Open a trip in one tap"];

export default function CtaBand() {
  return (
    <section
      aria-labelledby="cta"
      className="relative overflow-hidden mt-20 rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 p-8 sm:p-12 text-white shadow-2xl shadow-emerald-900/20"
    >
      <div className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-28 right-24 w-64 h-64 rounded-full bg-teal-300/20 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-6 left-1/2 w-24 h-24 rounded-full border border-white/20" aria-hidden="true" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-white/15 border border-white/20 px-3 py-1 rounded-full">
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" /> Saved routes
          </span>
          <h2 id="cta" className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">Ride the same routes every day?</h2>
          <p className="mt-2 max-w-xl text-emerald-50/90">Save your regular trips and open them again in one tap.</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-emerald-50">
            {POINTS.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20"><Check className="w-3 h-3" aria-hidden="true" /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link href="/saved" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-emerald-800 font-semibold shadow-lg hover:bg-emerald-50 transition-colors">
            <Bookmark className="w-4 h-4" aria-hidden="true" /> Open saved routes
          </Link>
          <Link href="#all-buses" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/25 text-white font-semibold hover:bg-white/20 transition-colors">
            <Compass className="w-4 h-4" aria-hidden="true" /> Browse all buses
          </Link>
        </div>
      </div>
    </section>
  );
}