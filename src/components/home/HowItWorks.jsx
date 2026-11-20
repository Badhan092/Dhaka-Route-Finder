
import {
  ArrowRight,
  Bookmark,
  Route,
  Search,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    Icon: Search,
    number: "01",
    title: "Search your route",
    description:
      "Enter where you're starting and where you want to go. We'll find matching stops from our Dhaka bus network.",
    label: "Find your starting point",
  },
  {
    Icon: Route,
    number: "02",
    title: "Compare your options",
    description:
      "Explore buses serving both stops, check the stops along your journey, and discover convenient alternatives.",
    label: "Choose the best bus",
  },
  {
    Icon: Bookmark,
    number: "03",
    title: "Save & travel",
    description:
      "Open the complete bus route, check your journey details, and bookmark the routes you use regularly.",
    label: "Your journey starts here",
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how"
      className="mt-16 relative isolate overflow-hidden rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-[#F0FDF8] to-teal-100/80 px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14 shadow-lg shadow-emerald-900/[0.04]"
    >
      {/* Decorative background effects */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-emerald-300/30 blur-[90px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-teal-300/25 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "radial-gradient(#059669 0.8px, transparent 0.8px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        {/* Section heading */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Simple & convenient
            </div>

            <h2
              id="how"
              className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
            >
              Your journey,{" "}
              <span className="text-emerald-600">
                simplified.
              </span>
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
              Finding the right bus in Dhaka doesn't have to be complicated.
              Just follow three simple steps.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-xs font-semibold text-emerald-800 shadow-sm sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#34D399]" />
            Three easy steps
          </div>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[8%] right-[8%] top-[35px] hidden h-px bg-gradient-to-r from-emerald-300/20 via-emerald-500/50 to-emerald-300/20 md:block"
          />

          {STEPS.map(({ Icon, number, title, description, label }) => (
            <article
              key={number}
              className="group relative rounded-2xl border border-white/90 bg-white/85 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/[0.07] sm:p-6"
            >
              {/* Step header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>

                <span className="text-3xl font-black tracking-tighter text-emerald-900/10 transition-colors duration-300 group-hover:text-emerald-500/30">
                  {number}
                </span>
              </div>

              {/* Step title */}
              <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-900">
                {title}
              </h3>

              <p className="mt-2 min-h-[66px] text-sm leading-relaxed text-slate-500">
                {description}
              </p>

              {/* Bottom label */}
              <div className="mt-5 flex items-center justify-between border-t border-emerald-100 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {label}
                </span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-emerald-500 group-hover:text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-200/70 pt-5">
          <p className="text-xs text-slate-600">
            <span className="font-bold text-emerald-700">
              Less confusion.
            </span>{" "}
            More confident journeys.
          </p>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
            Made for Dhaka commuters
            <span className="text-base">🚌</span>
          </div>
        </div>
      </div>
    </section>
  );
}
