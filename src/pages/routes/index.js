import Head from "next/head";
import Link from "next/link";

import { findDirect, findTransfers } from "@/lib/routeMatching";
import { nameMatches, stopKey } from "@/lib/locationUtils";

import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import HeroSearch from "@/components/HeroSearch";
import RouteResultCard from "@/components/RouteResultCard";
import EmptyState from "@/components/EmptyState";

import { Shuffle, RotateCcw } from "lucide-react";

// Load bus data exclusively on the server.
export async function getServerSideProps(context) {
  try {
    const { getBuses, getStops } = await import("@/lib/busData");

    const buses = await getBuses();
    const stops = getStops(buses);

    return {
      props: {
        buses,
        stops,
        searchParams: context.query,
      },
    };
  } catch (error) {
    console.error("[routes] Failed to load bus data:", error);

    return {
      props: {
        buses: [],
        stops: [],
        searchParams: context.query,
        dataError: true,
      },
    };
  }
}

export default function RoutesPage({ buses, stops, searchParams: sp, dataError = false }) {
  // Read query parameters safely.
  const one = (key) => (Array.isArray(sp[key]) ? sp[key][0] : sp[key])?.trim() || "";

  const from = one("from");
  const to = one("to");
  const q = one("q");
  const sort = one("sort") || "stops";
  const directOnly = one("direct") === "1";

  const f = stops.find((s) => s.key === stopKey(from));
  const t = stops.find((s) => s.key === stopKey(to));

  const suggest = (name) => {
    const key = stopKey(name);

    return key ? stops.filter((s) => s.key.includes(key) || key.includes(s.key)).slice(0, 5) : [];
  };

  let body;

  if (dataError) {
    body = (
      <EmptyState
        title="Unable to load bus routes"
        description="The bus dataset could not be loaded. Please try again later."
      />
    );
  } else if (!from || !to) {
    body = (
      <EmptyState
        title="Where are you travelling?"
        description="Select a starting location and destination above to view all matching buses."
      />
    );
  } else if (!f || !t) {
    const bad = !f ? ["from", from] : ["to", to];
    const opts = suggest(bad[1]);

    body = (
      <EmptyState
        title={`"${bad[1]}" is not in the dataset`}
        description="We could not find an exact stoppage matching that name in the transit registry."
      >
        {opts.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold text-slate-600">
              Did you mean one of these stops?
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {opts.map((s) => (
                <Link
                  key={s.key}
                  href={`/routes?${new URLSearchParams({
                    from: bad[0] === "from" ? s.name : from,
                    to: bad[0] === "to" ? s.name : to,
                  }).toString()}`}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </EmptyState>
    );
  } else if (f.key === t.key) {
    body = (
      <EmptyState
        title="Origin and destination are the same"
        description="Please choose two different stops to view available bus routes."
      />
    );
  } else {
    let direct = findDirect(buses, f.key, t.key).filter((r) => nameMatches(r.bus, q));

    direct.sort(
      sort === "name"
        ? (a, b) =>
            a.bus.name.localeCompare(b.bus.name, "en", {
              numeric: true,
            })
        : (a, b) => a.seg.count - b.seg.count || a.bus.name.localeCompare(b.bus.name),
    );

    const transfers = directOnly
      ? []
      : findTransfers(buses, f.key, t.key).filter(
          (r) => nameMatches(r.a, q) || nameMatches(r.b, q),
        );

    const baseQuery = {
      from: f.name,
      to: t.name,
    };

    body = (
      <div className="space-y-6">
        {/* Filter Bar */}
        <form
          action="/routes"
          method="GET"
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm"
        >
          <input type="hidden" name="from" value={f.name} />
          <input type="hidden" name="to" value={t.name} />

          <div className="min-w-[180px] flex-1">
            <label htmlFor="q" className="mb-1 block font-bold text-slate-500">
              Filter Bus Name
            </label>

            <input
              id="q"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="e.g. Alif, Bikash..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="min-w-[140px]">
            <label htmlFor="sort" className="mb-1 block font-bold text-slate-500">
              Sort By
            </label>

            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
            >
              <option value="stops">Fewest Stops</option>
              <option value="name">Bus Name (A–Z)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-5">
            <label className="flex cursor-pointer select-none items-center gap-1.5 font-semibold text-slate-700">
              <input
                type="checkbox"
                name="direct"
                value="1"
                defaultChecked={directOnly}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />

              <span>Direct only</span>
            </label>
          </div>

          <div className="ml-auto flex items-center gap-2 pt-5">
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Apply Filters
            </button>

            <Link
              href={`/routes?${new URLSearchParams(baseQuery).toString()}`}
              className="p-2 text-slate-400 hover:text-slate-600"
              title="Reset Filters"
              aria-label="Reset Filters"
            >
              <RotateCcw className="h-4 w-4" />
            </Link>
          </div>
        </form>

        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {direct.length} direct {direct.length === 1 ? "bus" : "buses"}:{" "}
              <span className="text-emerald-700">{f.name}</span>
              {" ➔ "}
              <span className="text-emerald-700">{t.name}</span>
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Source routes run bidirectionally across Dhaka.
            </p>
          </div>
        </div>

        {/* Direct Buses */}
        {direct.length > 0 ? (
          <div className="space-y-4">
            {direct.map(({ bus, seg }) => (
              <RouteResultCard key={bus.slug} bus={bus} seg={seg} from={f.name} to={t.name} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No direct bus found"
            description={`No single bus lists both ${f.name} and ${t.name}. ${
              transfers.length > 0
                ? "See the 1-change transfer options below."
                : "Try selecting a nearby major hub."
            }`}
          />
        )}

        {/* Transfers */}
        {transfers.length > 0 && (
          <div className="mt-12 space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-amber-100 p-1.5 text-amber-800">
                <Shuffle className="h-4 w-4" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Alternative Transfer Options (1 Change)
                </h3>

                <p className="text-xs text-slate-500">
                  Switch buses at the indicated interchange stop.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {transfers.map((x, idx) => (
                <article
                  key={`${x.a.slug}-${x.b.slug}-${x.at}-${idx}`}
                  className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      1 Transfer · {x.total} Total Stops
                    </span>

                    <span className="text-xs text-slate-400">Option #{idx + 1}</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <span className="block text-sm font-bold text-slate-900">
                        <Link href={`/buses/${x.a.slug}`} className="hover:text-emerald-600">
                          {x.a.name}
                        </Link>
                      </span>

                      <span className="text-slate-600">
                        {f.name} ➔ {x.at} ({x.s1.count} stops)
                      </span>
                    </div>

                    <div className="rounded-lg bg-emerald-50/80 py-1 text-center font-bold text-emerald-700">
                      Transfer at {x.at}
                    </div>

                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <span className="block text-sm font-bold text-slate-900">
                        <Link href={`/buses/${x.b.slug}`} className="hover:text-emerald-600">
                          {x.b.name}
                        </Link>
                      </span>

                      <span className="text-slate-600">
                        {x.at} ➔ {t.name} ({x.s2.count} stops)
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Find a Bus — Dhaka Bus Finder</title>
        <meta
          name="description"
          content="Search direct buses and transfers between any two locations in Dhaka city."
        />
      </Head>

      <div className="flex min-h-screen flex-col bg-slate-50">
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          <div className="mb-8">
            <HeroSearch allStops={stops.map((s) => s.name)} />
          </div>

          {body}
        </main>
      </div>
    </>
  );
}
