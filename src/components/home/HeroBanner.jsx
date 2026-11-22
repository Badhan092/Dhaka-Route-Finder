
import { Bus, MapPin, Compass } from "lucide-react";

const pill = "flex items-center gap-2 bg-white/85 px-3.5 py-2 rounded-xl border border-emerald-900/15 shadow-sm";

const badges = [
  { Icon: MapPin, color: "text-rose-600", label: "All DMP Corridors" },
  { Icon: Compass, color: "text-amber-600", label: "Verified Stoppages" },
];

export default function HeroBanner({ filteredCount, busesCount }) {
  return (
    <section 
    className="
    relative 
    isolate 
    overflow-hidden 
    rounded-3xl border border-emerald-900/15 
    bg-gradient-to-br from-[#f8f3ea] via-[#f2ece3] to-emerald-50 
    p-6 sm:p-10 md:min-h-[320px] mb-8 text-emerald-950"
    >

      {/* Dhaka City Outline - Right Center */}
      <img
        src="/images/dhaka-outline.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="
        pointer-events-none 
        select-none 
        absolute right-0 top-20 -translate-y-[40%]
        w-[100%] max-w-[680px] h-auto object-contain opacity-80"
      />

      {/* Gradient Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#f8f3ea]/95 via-[#f2ece3]/65 to-emerald-50/35"
      />

      {/* Decorative Emerald Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -bottom-20 z-[2] h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
      />

      {/* Bus Image - Over Dhaka Outline */}
      <img
        src="/images/brtc-bus.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="
        pointer-events-none select-none 
        hidden md:block
        absolute z-[3] right-[10%] top-[180px] -translate-y-[42%]
        h-[195px] lg:h-[245px] w-auto object-contain"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">

        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-800/25 bg-emerald-800/10 px-3 py-1 text-xs font-semibold text-emerald-900">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-600" />
          ঢাকা সিটি ট্রানজিট • Dhaka Bus Directory
        </span>

        <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Navigate <span className="text-emerald-700">Dhaka</span> with Ease
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
          From Mirpur to Motijheel, Uttara to Sadarghat—find reliable routes,
          counters, and stoppages across all local, semi-sitting, and AC services.
        </p>

        {/* Statistics & Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium">

          <div className={`${pill} text-emerald-900`}>
            <Bus className="h-4 w-4 text-emerald-700" />
            <span>
              Showing{" "}
              <strong className="font-bold">{filteredCount}</strong> of{" "}
              {busesCount} buses
            </span>
          </div>

          {badges.map(({ Icon, color, label }) => (
            <div key={label} className={`${pill} text-slate-700`}>
              <Icon className={`h-4 w-4 ${color}`} />
              <span>{label}</span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
