import EmptyState from "@/components/EmptyState";
import RouteResultCard from "@/components/RouteResultCard";
import FilterBar from "./FilterBar";
import TransferSection from "./TransferSection";

export default function RouteResults({ result, params }) {
  const { from, to, direct, transfers } = result;
  const count = direct.length;

  const emptyDescription = `No single bus lists both ${from} and ${to}. ${
    transfers.length ? "See the 1-change transfer options below." : "Try selecting a nearby major hub."
  }`;

  return (
    <div className="space-y-6">
      <FilterBar from={from} to={to} q={params.q} sort={params.sort} directOnly={params.directOnly} />

      <header className="border-b border-slate-200 pb-2">
        <h2 className="text-xl font-bold text-slate-900">
          {count} direct {count === 1 ? "bus" : "buses"}:{" "}
          <span className="text-emerald-700">{from}</span>
          {" ➔ "}
          <span className="text-emerald-700">{to}</span>
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">Source routes run bidirectionally across Dhaka.</p>
      </header>

      {count > 0 ? (
        <div className="space-y-4">
          {direct.map(({ bus, seg }) => (
            <RouteResultCard key={bus.slug} bus={bus} seg={seg} from={from} to={to} />
          ))}
        </div>
      ) : (
        <EmptyState title="No direct bus found" description={emptyDescription} />
      )}

      <TransferSection transfers={transfers} from={from} to={to} />
    </div>
  );
}