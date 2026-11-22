
import { useState } from "react";
import Link from "next/link";
import {ArrowLeftRight,ArrowRight,CircleDot,Flag,Search,Sparkles,Navigation,MoveRight,} from "lucide-react";

const ROUTES_PATH = "/routes";

export default function TripPlanner({ stops = [], commutes = [] }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const ready = from.trim() && to.trim();

  const input = `
    h-[54px] w-full rounded-xl
    border border-slate-200/80
    bg-white pl-11 pr-4
    text-sm font-medium text-slate-900
    placeholder:text-slate-400
    shadow-sm outline-none
    transition-all duration-200
    hover:border-sky-300
    focus:border-sky-500
    focus:ring-4 focus:ring-sky-400/15
  `;

  const label = `
    mb-2 flex items-center gap-2
    text-[10px] font-extrabold uppercase
    tracking-[0.13em] text-white/85
  `;

  return (
    <section
      aria-labelledby="trip"
      className="
        relative isolate mt-9 overflow-hidden
        rounded-[26px]
        border border-[#B9D5E8]/60
        bg-gradient-to-br
        from-[#183653]
        via-[#245477]
        to-[#4789A5]
        shadow-[0_18px_45px_-18px_rgba(30,64,100,0.30)]
        sm:mt-12 sm:rounded-[30px]
      "
    >
      {/* Full Container Background Bus Image */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          overflow-hidden
        "
      >
        <img
          src="/images/hero-background.jpg"
          alt="bus on a road in Dhaka"
          className="h-full w-full object-cover object-left opacity-[0.40] grayscale mix-blend-luminosity"
        />

        {/* Blue Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#183653]/75 via-[#245477]/75 to-[#4789A5]/70 "
        />
      </div>

      {/* Gradient Background Decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-28 -top-36 z-0
          h-[380px] w-[380px]
          rounded-full bg-sky-300/20 blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-40 -left-20 z-0
          h-[350px] w-[350px]
          rounded-full bg-cyan-200/15 blur-[90px]
        "
      />

      {/* Subtle Route Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-0 hidden h-full w-[38%] opacity-[0.40] lg:block"
      >
        <svg
          viewBox="0 0 420 360"
          fill="none"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M420 -30H300C250 -30 250 45 250 90V120C250 155 220 175 185 175H140C95 175 95 220 95 260V390"
            stroke="#BAE6FD"
            strokeWidth="2"
            strokeDasharray="7 9"
          />

          <path
            d="M450 60H360C320 60 320 105 320 140V180C320 220 280 240 240 240H210"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="7 9"
          />

          <circle cx="250" cy="90" r="7" fill="#BAE6FD" />
          <circle cx="95" cy="260" r="7" fill="#BAE6FD" />
          <circle cx="320" cy="140" r="7" fill="#FFFFFF" />

          <circle cx="250" cy="90" r="14" stroke="#BAE6FD" />
          <circle cx="95" cy="260" r="14" stroke="#BAE6FD" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-5 sm:p-8 lg:p-9">

        {/* Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl border border-white/25
                bg-white/15 text-white
                shadow-lg shadow-slate-950/10
                backdrop-blur-md
              "
            >
              <Navigation size={22} strokeWidth={2.2} />
            </div>

            <div>
              <h2
                id="trip"
                className="
                  text-xl font-black
                  tracking-tight text-white
                  sm:text-2xl
                "
              >
                Plan your trip
                <span className="text-sky-200">.</span>
              </h2>

              <p
                className="
                  mt-1 text-[11px] leading-relaxed
                  text-sky-100/80 sm:text-sm
                "
              >
                Find the right bus. Discover your route.
              </p>
            </div>
          </div>

          {/* Status */}
          <div
            className="
              hidden items-center gap-2
              rounded-full border border-white/20
              bg-white/10 px-3.5 py-2
              backdrop-blur-md sm:flex
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(110,231,183,0.15)]" />

            <span className="text-[10px] font-bold text-white/90">
              Direct routes
            </span>
          </div>
        </div>

        {/* Search Form */}
        <form
          action={ROUTES_PATH}
          method="GET"
          className="
            grid grid-cols-1 items-end gap-3
            md:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)_auto]
          "
        >
          {/* From */}
          <div className="min-w-0">
            <label htmlFor="trip-from" className={label}>
              <CircleDot size={14} className="text-emerald-300" />
              From
              <span className="font-medium tracking-normal text-white/60">
                · যেখান থেকে
              </span>
            </label>

            <div className="relative">
              <CircleDot
                size={19}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2 text-emerald-500
                "
              />

              <input
                id="trip-from"
                name="from"
                required
                list="trip-stops"
                autoComplete="off"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Mirpur 10"
                className={input}
              />
            </div>
          </div>

          {/* Swap Locations */}
          <button
            type="button"
            aria-label="Swap locations"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            className="
              group flex h-[46px] w-[46px]
              items-center justify-center
              justify-self-center rounded-full
              border border-white/25
              bg-white/15 text-white
              backdrop-blur-md
              transition-all duration-300
              hover:bg-white/25 hover:text-white
              hover:scale-105
              md:mb-1 md:h-11 md:w-11
            "
          >
            <ArrowLeftRight
              size={19}
              className="
                rotate-90 transition-transform duration-300
                group-hover:rotate-[270deg]
                md:rotate-0
                md:group-hover:rotate-180
              "
            />
          </button>

          {/* To */}
          <div className="min-w-0">
            <label htmlFor="trip-to" className={label}>
              <Flag size={14} className="text-sky-200" />
              To
              <span className="font-medium tracking-normal text-white/60">
                · যেখানে যাবেন
              </span>
            </label>

            <div className="relative">
              <Flag
                size={19}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2 text-sky-600
                "
              />

              <input
                id="trip-to"
                name="to"
                required
                list="trip-stops"
                autoComplete="off"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Motijheel"
                className={input}
              />
            </div>
          </div>

          {/* Stops Datalist */}
          <datalist id="trip-stops">
            {stops.map((s) => (
              <option key={s.key} value={s.name} />
            ))}
          </datalist>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!ready}
            className="
              group flex h-[54px] w-full
              items-center justify-center gap-2.5
              rounded-xl px-6
              bg-gradient-to-r from-emerald-400 to-teal-400
              text-sm font-extrabold text-[#103B46]
              shadow-[0_8px_20px_rgba(20,184,166,0.20)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:from-emerald-300 hover:to-teal-300
              disabled:translate-y-0
              disabled:cursor-not-allowed
              disabled:from-slate-300
              disabled:to-slate-300
              disabled:text-slate-500
              disabled:shadow-none
            "
          >
            <Search size={18} />

            Find buses

            <ArrowRight
              size={16}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </form>

        {/* Popular Trips */}
        {commutes.length > 0 && (
          <div className="mt-7 border-t border-white/20 pt-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-300" />

                <span
                  className="
                    text-[10px] font-extrabold
                    uppercase tracking-[0.15em]
                    text-white/75
                  "
                >
                  Popular trips
                </span>
              </div>

              <div className="flex flex-1 flex-wrap gap-2">
                {commutes.map((c) => (
                  <Link
                    key={c.from + c.to}
                    href={{
                      pathname: ROUTES_PATH,
                      query: {
                        from: c.from,
                        to: c.to,
                      },
                    }}
                    className="
                      group inline-flex items-center gap-2
                      rounded-full border border-white/20
                      bg-white/10 px-3.5 py-2
                      text-[11px] font-medium
                      text-white/90 backdrop-blur-sm
                      transition-all duration-200
                      hover:border-white/50
                      hover:bg-white/20 hover:text-white
                    "
                  >
                    <span>{c.from}</span>

                    <MoveRight
                      size={13}
                      className="
                        text-sky-200 transition-transform
                        group-hover:translate-x-1
                      "
                    />

                    <span>{c.to}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
