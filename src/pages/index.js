import Head from "next/head";
import Link from "next/link";

import { Search, MapPin, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

import { nameMatches, stopKey } from "@/lib/locationUtils";

import HeroBanner from "@/components/home/HeroBanner";
import StatsStrip from "@/components/home/StatsStrip";
import TripPlanner from "@/components/home/TripPlanner";
import HowItWorks from "@/components/home/HowItWorks";
import ServiceTypes from "@/components/home/ServiceTypes";
import HubStops from "@/components/home/HubStops";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/home/CtaBand";
import SectionHead from "@/components/home/SectionHead";

import BusCard from "@/components/BusCard";
import EmptyState from "@/components/EmptyState";

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const PER_PAGE = 12;

const TYPE_OPTIONS = ["Semi-Sitting", "AC", "Regular", "Local", "Circular"];

// Curated route suggestions.
// Only routes with available direct bus services are displayed.
const SUGGESTED_ROUTES = [
  ["Mirpur 10", "Motijheel"],
  ["Gabtoli", "Gulistan"],
  ["Mohammadpur", "Kuril Bishwa Road"],
  ["Azimpur", "Airport"],
  ["Farmgate", "Airport"],
  ["Mirpur 1", "Kalshi"],
];

const TYPE_GROUPS = [
  { label: "Semi-Sitting", filter: "Semi-Sitting" },
  { label: "Regular", filter: "Regular" },
  { label: "AC services", filter: "AC" },
  { label: "Local service", filter: "Local" },
  { label: "Circular", filter: "Circular" },
];

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/**
 * Normalize query parameters.
 * Next.js query parameters can be strings or arrays.
 */
const getQueryValue = (value) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value;

  return typeof normalizedValue === "string" ? normalizedValue.trim() : "";
};

/**
 * Normalize service type for comparison.
 */
const matchesBusType = (bus, type) => {
  if (!type) return true;

  return (bus.type || "").toLowerCase().includes(type.toLowerCase());
};

/**
 * Sort buses alphabetically.
 */
const sortBuses = (buses) => {
  return [...buses].sort((a, b) =>
    a.name.localeCompare(b.name, "en", {
      numeric: true,
      sensitivity: "base",
    }),
  );
};

/**
 * Filter buses using search, stop and service type.
 */
const filterBuses = (buses, { q, stop, type }) => {
  const selectedStopKey = stop ? stopKey(stop) : "";

  return sortBuses(
    buses.filter((bus) => {
      const matchesName = nameMatches(bus, q);

      const matchesStop = !selectedStopKey || (bus.stopKeys || []).includes(selectedStopKey);

      const matchesType = matchesBusType(bus, type);

      return matchesName && matchesStop && matchesType;
    }),
  );
};

/**
 * Calculate pagination.
 */
const paginate = (items, requestedPage) => {
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));

  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);

  const startIndex = (currentPage - 1) * PER_PAGE;

  return {
    currentPage,
    totalPages,
    pagedItems: items.slice(startIndex, startIndex + PER_PAGE),
  };
};

// -----------------------------------------------------------------------------
// Homepage Data
// -----------------------------------------------------------------------------

/**
 * Generate homepage statistics and sections from bus data.
 *
 * All values are derived from the actual dataset.
 */
const getHomeData = (buses, stops, findDirect) => {
  // Create a stop lookup map for faster access.
  const stopMap = new Map(stops.map((stop) => [stop.name.toLowerCase(), stop]));

  // Group buses by stop in a single pass.
  const busesByStop = new Map();

  buses.forEach((bus) => {
    (bus.stopKeys || []).forEach((key) => {
      if (!busesByStop.has(key)) {
        busesByStop.set(key, []);
      }

      busesByStop.get(key).push(bus);
    });
  });

  // Suggested direct commute routes.
  const commutes = SUGGESTED_ROUTES.reduce((result, [fromName, toName]) => {
    const fromStop = stopMap.get(fromName.toLowerCase());
    const toStop = stopMap.get(toName.toLowerCase());

    if (!fromStop || !toStop) {
      return result;
    }

    const directBuses = findDirect(buses, fromStop.key, toStop.key);

    if (directBuses.length > 0) {
      result.push({
        from: fromStop.name,
        to: toStop.name,
      });
    }

    return result;
  }, []);

  // Service type statistics.
  const types = TYPE_GROUPS.map(({ label, filter }) => {
    const count = buses.filter((bus) => matchesBusType(bus, filter)).length;

    return {
      label,
      filter,
      n: count,
    };
  }).filter((item) => item.n > 0);

  // Most popular stops based on the number of buses serving them.
  const hubs = [...stops]
    .map((stop) => {
      const servingBuses = busesByStop.get(stop.key) || [];

      return {
        key: stop.key,
        name: stop.name,
        n: servingBuses.length,
        sample: servingBuses.slice(0, 3).map((bus) => bus.name),
      };
    })
    .sort((a, b) => b.n - a.n)
    .slice(0, 6);

  // Longest route.
  const longestStops = buses.reduce(
    (maximum, bus) => Math.max(maximum, (bus.stops || []).length),
    0,
  );

  return {
    stopsCount: stops.length,
    longestStops,
    commutes,
    types,
    hubs,
  };
};

// -----------------------------------------------------------------------------
// Server-Side Data Fetching
// -----------------------------------------------------------------------------

export async function getServerSideProps({ query }) {
  const [{ getBuses, getStops }, { findDirect }] = await Promise.all([
    import("@/lib/busData"),
    import("@/lib/routeMatching"),
  ]);

  // Parse query parameters.
  const filters = {
    q: getQueryValue(query.q),
    stop: getQueryValue(query.stop),
    type: getQueryValue(query.type),
  };

  const requestedPage = Math.max(1, parseInt(getQueryValue(query.page), 10) || 1);

  // Fetch bus dataset.
  const buses = await getBuses();

  // Generate available stops.
  const stops = getStops(buses);

  // Apply filters.
  const filteredBuses = filterBuses(buses, filters);

  // Generate pagination.
  const { currentPage, totalPages, pagedItems } = paginate(filteredBuses, requestedPage);

  // Generate homepage data.
  const home = getHomeData(buses, stops, findDirect);

  return {
    props: {
      ...filters,
      stops,
      busesCount: buses.length,
      filteredCount: filteredBuses.length,
      pagedBuses: pagedItems,
      currentPage,
      totalPages,
      home,
    },
  };
}

// -----------------------------------------------------------------------------
// Reusable Search & Filter Component
// -----------------------------------------------------------------------------

function BusSearchForm({ q, stop, type, stops, isHome }) {
  const fieldClass =
    "w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600";

  const labelClass = "block text-xs font-bold text-slate-500 uppercase mb-1";

  const hasFilters = Boolean(q || stop || type);

  return (
    <form
      action="/buses"
      method="GET"
      role="search"
      className={`${
        isHome ? "" : "mt-6 "
      }bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-end`}
    >
      {/* Bus Name */}
      <div className="flex-1 w-full">
        <label htmlFor="q" className={labelClass}>
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
            className={fieldClass}
          />
        </div>
      </div>

      {/* Stop / Area */}
      <div className="flex-1 w-full">
        <label htmlFor="stop" className={labelClass}>
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
            className={fieldClass}
          />

          <datalist id="stoplist">
            {stops.map((item) => (
              <option key={item.key} value={item.name} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Service Type */}
      <div className="flex-1 w-full">
        <label htmlFor="type" className={labelClass}>
          Service Type
        </label>

        <div className="relative">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />

          <select id="type" name="type" defaultValue={type} className={fieldClass}>
            <option value="">All service types</option>

            {TYPE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          type="submit"
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors w-full sm:w-auto"
        >
          Filter
        </button>

        {hasFilters && (
          <Link
            href="/buses"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
          >
            Clear
          </Link>
        )}
      </div>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Reusable Bus Directory Component
// -----------------------------------------------------------------------------

function BusGrid({ buses }) {
  if (!buses.length) {
    return (
      <EmptyState
        title="No buses match your filter"
        description="Try shortening the bus name or checking the spelling of the stoppage area."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buses.map((bus) => (
        <BusCard key={bus.slug} bus={bus} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Reusable Pagination Component
// -----------------------------------------------------------------------------

function Pagination({ currentPage, totalPages, buildUrl }) {
  if (totalPages <= 1) {
    return null;
  }

  const buttonClass =
    "px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:border-emerald-500 font-semibold flex items-center gap-1";

  const disabledClass =
    "px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed flex items-center gap-1";

  return (
    <nav
      aria-label="Bus directory pagination"
      className="flex items-center justify-center gap-3 mt-12 pt-6 border-t border-slate-200 text-sm"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)} rel="prev" className={buttonClass}>
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </span>
      )}

      {/* Current Page */}
      <span aria-current="page" className="text-slate-600 font-medium px-2">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)} rel="next" className={buttonClass}>
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled="true">
          Next
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}

// -----------------------------------------------------------------------------
// Homepage Sections
// -----------------------------------------------------------------------------

function HomeSections({ home, stops, busesCount }) {
  return (
    <>
      <StatsStrip
        busesCount={busesCount}
        stopsCount={home.stopsCount}
        typesCount={home.types.length}
        longestStops={home.longestStops}
      />

      <TripPlanner stops={stops} commutes={home.commutes} />

      <HowItWorks />

      <ServiceTypes types={home.types} />

      <HubStops hubs={home.hubs} />
    </>
  );
}

// -----------------------------------------------------------------------------
// Main Page Component
// -----------------------------------------------------------------------------

export default function BusDirectoryPage({
  q,
  stop,
  type,
  stops,
  busesCount,
  filteredCount,
  pagedBuses,
  currentPage,
  totalPages,
  home,
}) {
  // Homepage sections are displayed only on the clean first page.
  const isHome = !q && !stop && !type && currentPage === 1;

  /**
   * Generate pagination URLs while preserving active filters.
   */
  const buildUrl = (page) => ({
    pathname: "/buses",
    query: {
      ...(q && { q }),
      ...(stop && { stop }),
      ...(type && { type }),
      page,
    },
  });

  return (
    <>
      {/* SEO */}
      <Head>
        <title>Dhaka Bus Finder — Bus Directory</title>

        <meta
          name="description"
          content="Find Dhaka bus routes, browse all local, semi-sitting and AC services, and see the stops on each route."
        />
      </Head>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Hero */}
        <HeroBanner filteredCount={filteredCount} busesCount={busesCount} />

        {/* Homepage Sections */}
        {isHome && <HomeSections home={home} stops={stops} busesCount={busesCount} />}

        {/* Bus Directory */}
        <section id="all-buses" aria-labelledby="all" className={isHome ? "mt-14" : ""}>
          {/* Section Heading */}
          {isHome && (
            <SectionHead
              id="all"
              title="All buses"
              subtitle={`Browse all ${busesCount} buses, A–Z.`}
            />
          )}

          {/* Search & Filters */}
          <div className="mb-8">
            <BusSearchForm q={q} stop={stop} type={type} stops={stops} isHome={isHome} />
          </div>

          {/* Bus Listing */}
          <BusGrid buses={pagedBuses} />

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} buildUrl={buildUrl} />
        </section>

        {/* Homepage Footer Sections */}
        {isHome && (
          <>
            <Faq />
            <CtaBand />
          </>
        )}
      </main>
    </>
  );
}
