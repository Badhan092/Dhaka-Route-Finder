import Head from "next/head";
import Link from "next/link";

// NOTE: no top-level import from "@/lib/busData" (it uses fs, server only).
import RouteMap from "@/components/RouteMap";
import RouteTimeline from "@/components/RouteTimeline";
import StopSegment from "@/components/StopSegment";
import BusImage from "@/components/BusImage";
import SaveButton from "@/components/SaveButton";

import {
  ChevronRight,
  Clock,
  MapPin,
  Navigation,
  Milestone,
  Sparkles,
  Banknote,
  ArrowRight,
} from "lucide-react";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

export async function getStaticPaths() {
  const { getBuses } = await import("@/lib/busData");
  const buses = await getBuses();

  return {
    paths: buses.map((b) => ({ params: { slug: b.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { getBusBySlug, getBuses, getRelated } = await import("@/lib/busData");

  const bus = await getBusBySlug(params.slug);
  if (!bus) return { notFound: true };

  // /buses/<id> -> /buses/<slug> so each bus has a single URL.
  if (bus.slug !== params.slug) {
    return { redirect: { destination: `/buses/${bus.slug}`, permanent: true } };
  }

  const allBuses = await getBuses();

  // Send only what the cards need.
  const related = getRelated(allBuses, bus, 4).map((r) => ({
    shared: r.shared,
    bus: { slug: r.bus.slug, name: r.bus.name, bn: r.bus.bn ?? null },
  }));

  return {
    // JSON round-trip strips `undefined`, which Next can't serialize.
    props: JSON.parse(JSON.stringify({ bus, related })),
    revalidate: 3600,
  };
}

export default function BusDetailPage({ bus, related }) {
  const firstStop = bus.stops[0];
  const lastStop = bus.stops[bus.stops.length - 1];

  const title = `${bus.bn ? `${bus.name} (${bus.bn})` : bus.name} Route, Stops & Map — Dhaka Bus Finder`;
  const description = `${bus.name}: ${firstStop} ⇄ ${lastStop}, ${bus.stops.length} stops in Dhaka city.`;
  const canonical = SITE_URL ? `${SITE_URL}/buses/${bus.slug}` : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
      </Head>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/buses" className="hover:text-emerald-600 transition-colors">
            Bus Directory
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px]">
            {bus.name}
          </span>
        </nav>

        {/* Hero Transit Identity Banner */}
        <section className="relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  {bus.type || bus.service_type || "City Transit"}
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                  <Milestone className="w-3.5 h-3.5 text-slate-500" />
                  {bus.stops.length} Stoppages
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  {bus.name}
                </h1>
                {bus.bn && (
                  <p className="text-emerald-700 font-medium text-lg sm:text-xl mt-1 tracking-normal font-sans">
                    {bus.bn}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <SaveButton
                item={{
                  id: bus.slug,
                  label: bus.name,
                  href: `/buses/${bus.slug}`,
                }}
                className="py-2.5 px-4 shadow-sm"
              />

              <Link
                href={{
                  pathname: "/routes",
                  query: { from: firstStop, to: lastStop },
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.01]"
              >
                <Navigation className="w-3.5 h-3.5" />
                Find Between Terminals
              </Link>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 text-slate-700">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Origin &amp; Destination
                </p>
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm mt-0.5 truncate">
                  <span className="truncate">{firstStop}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{lastStop}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Schedule
                </p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  6:00 AM – 11:00 PM{" "}
                  <span className="text-xs text-slate-400 font-normal">(Approx)</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Fare Structure
                </p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{bus.fare_text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bus Image (If Available) */}
        {bus.image && (
          <section className="mb-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-3 max-w-md shadow-sm overflow-hidden">
              <BusImage src={bus.image} alt={bus.name} />
            </div>
          </section>
        )}

        {/* Route Explorer & Mapping */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Stop Timeline */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Ordered Stoppages</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sequential stops along this route
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                {bus.stops.length} Total
              </span>
            </div>

            <div className="max-h-[560px] overflow-y-auto pr-2 custom-scrollbar">
              <RouteTimeline stops={bus.stops} />
            </div>
          </div>

          {/* Right: Map & Segment Calculator */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Geographic Route Map</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified GPS stoppage nodes across Dhaka
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <RouteMap stops={bus.stops} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="pb-4 mb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Custom Segment Calculator</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pick your boarding and drop-off points to isolate exact stops and travel
                  distance.
                </p>
              </div>
              <StopSegment stops={bus.stops} />
            </div>
          </div>
        </section>

        {/* Related Routes */}
        {related.length > 0 && (
          <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Alternative Overlapping Routes</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Other buses sharing multiple stops with {bus.name} that you can take as
                alternatives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.bus.slug}
                  href={`/buses/${r.bus.slug}`}
                  className="group p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 rounded-2xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full uppercase">
                      {r.shared} Shared Stops
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-2 group-hover:text-emerald-700 transition-colors truncate">
                      {r.bus.name}
                    </h3>
                    {r.bus.bn && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{r.bus.bn}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-4">
                    <span>View Bus</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
