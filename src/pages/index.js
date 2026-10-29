import Head from "next/head";
import Link from "next/link";

import { nameMatches, stopKey } from "@/lib/locationUtils";

import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

import HeroBanner from "@/components/home/HeroBanner";
import BusCard from "@/components/BusCard";
import EmptyState from "@/components/EmptyState";




const PER_PAGE = 12;

export async function getServerSideProps({ query }) {
  const { getBuses, getStops } = await import("@/lib/busData");

  const one = (value) => (Array.isArray(value) ? value[0] : value)?.trim() || "";

  const q = one(query.q);
  const stop = one(query.stop);
  const pageParam = parseInt(one(query.page), 10) || 1;

  const buses = await getBuses();
  const stops = getStops(buses);

  let filtered = buses.filter((bus) => nameMatches(bus, q));

  if (stop) {
    const key = stopKey(stop);
    filtered = filtered.filter((bus) => bus.stopKeys.includes(key));
  }

  filtered.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const currentPage = Math.min(Math.max(1, pageParam), totalPages);

  const startIdx = (currentPage - 1) * PER_PAGE;
  const pagedBuses = filtered.slice(startIdx, startIdx + PER_PAGE);

  return {
    props: {
      q,
      stop,
      stops,
      busesCount: buses.length,
      filteredCount: filtered.length,
      pagedBuses,
      currentPage,
      totalPages,
    },
  };
}

export default function BusDirectoryPage({
  q,
  stop,
  stops,
  busesCount,
  filteredCount,
  pagedBuses,
  currentPage,
  totalPages,
}) {
  const buildUrl = (page) => ({
    pathname: "/buses",
    query: {
      ...(q && { q }),
      ...(stop && { stop }),
      page,
    },
  });

  return (
    <>
      <Head>
        <title>Bus Directory — Dhaka Bus Finder</title>
        <meta
          name="description"
          content="Complete directory of all 80 registered local, semi-sitting, and AC buses in Dhaka city."
        />
      </Head>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">

        {/* Hero Banner Component */}
        <HeroBanner filteredCount={filteredCount} busesCount={busesCount} />

        {/* Directory Search & Filter Form */}
        <div className="mb-8">
          <form
            action="/buses"
            className="mt-6 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-end"
          >
            <div className="flex-1 w-full">
              <label htmlFor="q" className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Search Bus Name
              </label>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                <input
                  id="q"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="e.g. Alif, Bikash, Achim..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <label
                htmlFor="stop"
                className="block text-xs font-bold text-slate-500 uppercase mb-1"
              >
                Serves Area / Stop
              </label>

              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

                <input
                  id="stop"
                  name="stop"
                  type="search"
                  list="stoplist"
                  defaultValue={stop}
                  placeholder="e.g. Farmgate, Mirpur 10..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
                />

                <datalist id="stoplist">
                  {stops.map((item) => (
                    <option key={item.key} value={item.name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors w-full sm:w-auto"
              >
                Filter
              </button>

              {(q || stop) && (
                <Link
                  href="/buses"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
                >
                  Clear
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Bus Grid */}
        {pagedBuses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagedBuses.map((bus) => (
              <BusCard key={bus.slug} bus={bus} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No buses match your filter"
            description="Try shortening the bus name or checking the spelling of the stoppage area."
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-3 mt-12 pt-6 border-t border-slate-200 text-sm">
            {currentPage > 1 ? (
              <Link
                href={buildUrl(currentPage - 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:border-emerald-500 font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            ) : (
              <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </span>
            )}

            <span className="text-slate-600 font-medium px-2">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={buildUrl(currentPage + 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:border-emerald-500 font-semibold flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed flex items-center gap-1">
                Next
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </nav>
        )}
      </main>
    </>
  );
}
