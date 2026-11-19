
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  BusFront,
  MoveUpRight,
} from "lucide-react";

import SectionHead from "./SectionHead";

export default function HubStops({ hubs = [] }) {
  if (!hubs.length) return null;

  const max = Math.max(...hubs.map((hub) => hub.n), 1);

  return (
    <section aria-labelledby="hubs" className="mt-20">
      <SectionHead
        id="hubs"
        eyebrow="Dhaka transit network"
        title="Where the city connects."
        subtitle="Explore Dhaka's busiest interchange points and discover the bus services connecting different parts of the city."
        href="#all-buses"
        hrefLabel="Explore all routes"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {hubs.map((hub, index) => {
          const percentage = Math.round((hub.n / max) * 100);
          const isTopHub = index === 0;
          const remaining = Math.max(
            0,
            hub.n - (hub.sample || []).length
          );

          return (
            <Link
              key={hub.key}
              href={{
                pathname: "/buses",
                query: { stop: hub.name },
              }}
              aria-label={`Explore ${hub.n} buses serving ${hub.name}`}
              className={`
                group relative isolate flex min-h-[280px] flex-col
                overflow-hidden rounded-[28px] border p-5 sm:p-6
                transition-all duration-300 ease-out
                hover:-translate-y-1.5 hover:shadow-2xl
                ${
                  isTopHub
                    ? "bg-[#082F25] border-emerald-900 text-white hover:shadow-emerald-950/20"
                    : "bg-white border-slate-200 text-slate-900 hover:border-emerald-300 hover:shadow-emerald-950/5"
                }
              `}
            >
              {/* Decorative background */}
              <div
                aria-hidden="true"
                className={`
                  absolute -right-12 -top-16 h-48 w-48 rounded-full
                  border-[28px] transition-transform duration-500
                  group-hover:scale-110
                  ${
                    isTopHub
                      ? "border-emerald-400/10"
                      : "border-emerald-50"
                  }
                `}
              />

              <div
                aria-hidden="true"
                className={`
                  absolute -right-4 top-10 h-32 w-32 rounded-full
                  border border-dashed
                  ${
                    isTopHub
                      ? "border-emerald-300/20"
                      : "border-emerald-200"
                  }
                `}
              />

              {/* Top row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`
                      flex h-10 w-10 items-center justify-center
                      rounded-2xl
                      ${
                        isTopHub
                          ? "bg-emerald-400 text-[#082F25]"
                          : "bg-emerald-50 text-emerald-700"
                      }
                    `}
                  >
                    <MapPin className="h-5 w-5" />
                  </span>

                  <span
                    className={`
                      text-[10px] font-bold uppercase tracking-[0.16em]
                      ${
                        isTopHub
                          ? "text-emerald-300"
                          : "text-slate-400"
                      }
                    `}
                  >
                    Transit hub / {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <span
                  className={`
                    flex h-9 w-9 items-center justify-center
                    rounded-full border transition-all duration-300
                    group-hover:rotate-45 group-hover:scale-110
                    ${
                      isTopHub
                        ? "border-white/15 bg-white/10 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-500 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600"
                    }
                  `}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              {/* Hub name */}
              <div className="relative z-10 mt-7">
                <h3
                  className={`
                    text-2xl sm:text-[28px] font-extrabold
                    tracking-tight leading-tight
                    ${
                      isTopHub
                        ? "text-white"
                        : "text-slate-900"
                    }
                  `}
                >
                  {hub.name}
                </h3>

                <p
                  className={`
                    mt-1.5 text-sm
                    ${
                      isTopHub
                        ? "text-emerald-100/65"
                        : "text-slate-500"
                    }
                  `}
                >
                  Major bus interchange
                </p>
              </div>

              {/* Bus count */}
              <div className="relative z-10 mt-auto pt-7">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`
                          text-5xl font-black tracking-[-0.06em]
                          tabular-nums
                          ${
                            isTopHub
                              ? "text-emerald-300"
                              : "text-emerald-700"
                          }
                        `}
                      >
                        {hub.n}
                      </span>

                      <span
                        className={`
                          text-xs font-semibold
                          ${
                            isTopHub
                              ? "text-emerald-100/60"
                              : "text-slate-400"
                          }
                        `}
                      >
                        buses
                      </span>
                    </div>

                    <p
                      className={`
                        mt-1 text-xs
                        ${
                          isTopHub
                            ? "text-emerald-100/50"
                            : "text-slate-400"
                        }
                      `}
                    >
                      Serving this location
                    </p>
                  </div>

                  <div
                    className={`
                      flex h-11 w-11 items-center justify-center
                      rounded-2xl
                      ${
                        isTopHub
                          ? "bg-white/10 text-emerald-300"
                          : "bg-emerald-50 text-emerald-700"
                      }
                    `}
                  >
                    <BusFront className="h-5 w-5" />
                  </div>
                </div>

                {/* Activity indicator */}
                <div className="mt-4">
                  <div
                    className={`
                      h-1.5 w-full overflow-hidden rounded-full
                      ${
                        isTopHub
                          ? "bg-white/10"
                          : "bg-slate-100"
                      }
                    `}
                  >
                    <div
                      className={`
                        h-full rounded-full transition-all duration-700
                        ${
                          isTopHub
                            ? "bg-emerald-300"
                            : "bg-emerald-500"
                        }
                      `}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>


{/* Sample bus services */}
<div
  className={`
    relative z-10 mt-5 border-t pt-4
    ${
      isTopHub
        ? "border-white/10"
        : "border-slate-100"
    }
  `}
>
  <div className="mb-3 flex items-center justify-between gap-2">
    <span
      className={`
        whitespace-nowrap text-[10px] font-bold uppercase tracking-wider
        ${
          isTopHub
            ? "text-emerald-100/50"
            : "text-slate-400"
        }
      `}
    >
      Available services
    </span>

    {remaining > 0 && (
      <span
        className={`
          whitespace-nowrap text-[10px] font-semibold
          ${
            isTopHub
              ? "text-emerald-300"
              : "text-emerald-700"
          }
        `}
      >
        +{remaining} more
      </span>
    )}
  </div>

  <div className="flex w-full min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap">
    {(hub.sample || []).slice(0, 3).map((name) => (
      <span
        key={name}
        title={name}
        className={`
          min-w-0 max-w-[33.33%] shrink truncate
          rounded-lg px-2.5 py-1.5 text-[11px] font-semibold
          ${
            isTopHub
              ? "bg-white/10 text-emerald-50"
              : "bg-slate-50 border border-slate-100 text-slate-600"
          }
        `}
      >
        {name}
      </span>
    ))}
  </div>
</div>



             



              {/* Bottom hover action */}
              <div
                className={`
                  absolute bottom-5 right-5 z-20 flex items-center
                  gap-1.5 text-xs font-bold opacity-0 translate-y-2
                  transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-y-0
                  ${
                    isTopHub
                      ? "text-emerald-300"
                      : "text-emerald-700"
                  }
                `}
              >
                Explore buses
                <MoveUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
