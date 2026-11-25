import Head from "next/head";

import { getBuses, getStops } from "@/lib/busData";
import { parseParams, searchRoutes } from "@/lib/routeSearch";

import HeroSearch from "@/components/HeroSearch";
import EmptyState from "@/components/EmptyState";
import RouteResults from "@/components/routes/RouteResults";
import StopSuggestions from "@/components/routes/StopSuggestions";

export async function getServerSideProps({ query }) {
  const params = parseParams(query);

  try {
    const buses = await getBuses();
    const stops = getStops(buses);

    return {
      props: {
        params,
        stopNames: stops.map((s) => s.name),
        result: searchRoutes(buses, stops, params),
      },
    };
  } catch (error) {
    console.error("[routes] Failed to load bus data:", error);
    return { props: { params, stopNames: [], result: { status: "error" } } };
  }
}

function ResultBody({ result, params }) {
  switch (result.status) {
    case "error":
      return (
        <EmptyState
          title="Unable to load bus routes"
          description="The bus dataset could not be loaded. Please try again later."
        />
      );

    case "idle":
      return (
        <EmptyState
          title="Where are you travelling?"
          description="Select a starting location and destination above to view all matching buses."
        />
      );

    case "unknown-stop":
      return (
        <EmptyState
          title={`"${result.value}" is not in the dataset`}
          description="We could not find an exact stoppage matching that name in the transit registry."
        >
          <StopSuggestions
            field={result.field}
            from={params.from}
            to={params.to}
            suggestions={result.suggestions}
          />
        </EmptyState>
      );

    case "same-stop":
      return (
        <EmptyState
          title="Origin and destination are the same"
          description="Please choose two different stops to view available bus routes."
        />
      );

    default:
      return <RouteResults result={result} params={params} />;
  }
}

const RoutesPage = ({ params, stopNames, result }) => {
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
            <HeroSearch allStops={stopNames} />
          </div>
          <ResultBody result={result} params={params} />
        </main>
      </div>
    </>
  );
};

export default RoutesPage;
