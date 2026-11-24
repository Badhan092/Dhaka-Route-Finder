import Head from "next/head";

import { parseQuery } from "@/lib/busDirectory";
import { filterBuses, paginate, getHomeData } from "@/lib/busUtils"; // pure, client-safe

import HeroBanner from "@/components/home/HeroBanner";
import StatsStrip from "@/components/home/StatsStrip";
import TripPlanner from "@/components/home/TripPlanner";
import HowItWorks from "@/components/home/HowItWorks";
import ServiceTypes from "@/components/home/ServiceTypes";
import HubStops from "@/components/hubs/HubStops";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/home/CtaBand";
import SectionHead from "@/components/home/SectionHead";

import BusSearchForm from "@/components/buses/BusSearchForm";
import BusGrid from "@/components/buses/BusGrid";
import Pagination from "@/components/buses/Pagination";

export async function getServerSideProps({ query }) {
  // busData is server-only, so it is loaded dynamically (see its header comment).
  const [{ getBuses }, { getStops }, { findDirect }] = await Promise.all([
    import("@/lib/busData"),
    import("@/lib/busUtils"),
    import("@/lib/routeMatching"),
  ]);

  const { filters, page } = parseQuery(query);

  const buses = await getBuses();
  const stops = getStops(buses);

  const filtered = filterBuses(buses, filters);
  const { currentPage, totalPages, pagedItems } = paginate(filtered, page);

  // Homepage sections only appear on the clean first page.
  const isHome = !filters.q && !filters.stop && !filters.type && currentPage === 1;

  return {
    props: {
      filters,
      stops,
      isHome,
      busesCount: buses.length,
      filteredCount: filtered.length,
      pagedBuses: pagedItems,
      currentPage,
      totalPages,
      // Skipped (and not serialized) when it isn't displayed.
      home: isHome ? getHomeData(buses, stops, findDirect) : null,
    },
  };
}

export default function BusDirectoryPage({
  filters,
  stops,
  isHome,
  busesCount,
  filteredCount,
  pagedBuses,
  currentPage,
  totalPages,
  home,
}) {
  return (
    <>
      <Head>
        <title>Dhaka Bus Finder — Bus Directory</title>
        <meta
          name="description"
          content="Find Dhaka bus routes, browse all local, semi-sitting and AC services, and see the stops on each route."
        />
      </Head>
      <HeroBanner filteredCount={filteredCount} busesCount={busesCount} />
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
      <SectionHead id="all" title="All buses" subtitle={`Browse all ${busesCount} buses, A–Z.`} />
      <BusSearchForm filters={filters} stops={stops} isHome={isHome} />
      <BusGrid buses={pagedBuses} />
      <Pagination currentPage={currentPage} totalPages={totalPages} filters={filters} />
      <Faq />
      <CtaBand />
    </>
  );
}
