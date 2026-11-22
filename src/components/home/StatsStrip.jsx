
import {
  BusFront,
  MapPin,
  Layers3,
  Route,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export default function StatsStrip({
  busesCount = 0,
  stopsCount = 0,
  typesCount = 0,
  longestStops = 0,
}) {
  const items = [
    {
      id: "buses",
      Icon: BusFront,
      value: busesCount,
      label: "Bus routes",
      description: "Routes across Dhaka",
      color: "emerald",
    },
    {
      id: "stops",
      Icon: MapPin,
      value: stopsCount,
      label: "Distinct stops",
      description: "Connected locations",
      color: "blue",
    },
    {
      id: "types",
      Icon: Layers3,
      value: typesCount,
      label: "Service types",
      description: "Different bus categories",
      color: "violet",
    },
    {
      id: "longest",
      Icon: Route,
      value: longestStops,
      label: "Longest route",
      description: "Stops on a single route",
      color: "orange",
    },
  ];

  const themes = {
    emerald: {
      card: "bg-gradient-to-br from-[#ECFDF5] via-[#F0FDF9] to-white border-emerald-100",
      icon: "bg-emerald-500 text-white shadow-emerald-200",
      number: "text-emerald-950",
      label: "text-emerald-950",
      description: "text-emerald-800/60",
      accent: "bg-emerald-500",
      glow: "bg-emerald-400/20",
      tag: "text-emerald-700 bg-emerald-100/80",
    },
    blue: {
      card: "bg-gradient-to-br from-[#EFF6FF] via-[#F5FAFF] to-white border-blue-100",
      icon: "bg-blue-500 text-white shadow-blue-200",
      number: "text-blue-950",
      label: "text-blue-950",
      description: "text-blue-800/60",
      accent: "bg-blue-500",
      glow: "bg-blue-400/20",
      tag: "text-blue-700 bg-blue-100/80",
    },
    violet: {
      card: "bg-gradient-to-br from-[#F5F3FF] via-[#FAF8FF] to-white border-violet-100",
      icon: "bg-violet-500 text-white shadow-violet-200",
      number: "text-violet-950",
      label: "text-violet-950",
      description: "text-violet-800/60",
      accent: "bg-violet-500",
      glow: "bg-violet-400/20",
      tag: "text-violet-700 bg-violet-100/80",
    },
    orange: {
      card: "bg-gradient-to-br from-[#FFF7ED] via-[#FFFAF5] to-white border-orange-100",
      icon: "bg-orange-500 text-white shadow-orange-200",
      number: "text-orange-950",
      label: "text-orange-950",
      description: "text-orange-800/60",
      accent: "bg-orange-500",
      glow: "bg-orange-400/20",
      tag: "text-orange-700 bg-orange-100/80",
    },
  };

  return (
    <section
      aria-label="Dhaka bus network statistics"
      className="mt-14 sm:mt-16"
    >
      {/* Section heading */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Network intelligence
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-[-0.045em] text-slate-950 sm:text-3xl">
            Dhaka at a glance
            <span className="text-emerald-500">.</span>
          </h2>

          <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
            Discover the numbers behind Dhaka's connected bus network.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-2 shadow-sm sm:flex">
          <Activity size={14} className="text-emerald-600" />
          <span className="text-[10px] font-bold text-slate-600">
            Dataset overview
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
        {items.map((item, index) => {
          const { Icon, value, label, description, color } = item;
          const theme = themes[color];

          return (
            <article
              key={item.id}
              className={`
                group relative isolate overflow-hidden
                rounded-[16px] border p-4
                shadow-[0_3px_15px_rgba(15,23,42,0.035)]
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:shadow-[0_16px_35px_-15px_rgba(15,23,42,0.15)]
                sm:rounded-[16px] sm:p-6
                ${theme.card}
              `}
            >
              {/* Decorative background */}
              <div
                aria-hidden="true"
                className={`
                  pointer-events-none absolute -right-10 -top-12
                  h-36 w-36 rounded-full blur-3xl
                  transition-all duration-500
                  group-hover:scale-150
                  ${theme.glow}
                `}
              />

              {/* Top row */}
              <div className="relative flex items-center justify-between">
                <div
                  className={`
                    flex h-11 w-11 items-center justify-center
                    rounded-[8px] transition-all duration-300
                    group-hover:scale-110 group-hover:-rotate-6
                    ${theme.icon}
                  `}
                >
                  <Icon size={21} strokeWidth={2.2} />
                </div>

                <span
                  className={`
                    flex h-8 w-8 items-center justify-center
                    rounded-full transition-all duration-300
                    ${theme.tag}
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  `}
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>

              {/* Content */}
              <div className="relative mt-7 sm:mt-9">
                <p
                  className={`
                    text-[36px] font-black leading-none
                    tracking-[-0.07em] tabular-nums
                    sm:text-[44px]
                    ${theme.number}
                  `}
                >
                  {Number(value || 0).toLocaleString("en-US")}
                </p>

                <h3
                  className={`
                    mt-3 text-[12px] font-extrabold
                    sm:text-sm ${theme.label}
                  `}
                >
                  {label}
                </h3>

                <p
                  className={`
                    mt-1.5 text-[10px] font-medium
                    leading-relaxed sm:text-xs
                    ${theme.description}
                  `}
                >
                  {description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-white/80">
                <div
                  className={`
                    h-full w-1/3 rounded-full
                    transition-all duration-500
                    group-hover:w-full ${theme.accent}
                  `}
                />
              </div>

              {/* Index */}
              <span className="
                absolute bottom-5 right-5
                text-[10px] font-black tracking-widest
                opacity-20
              ">
                0{index + 1}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
