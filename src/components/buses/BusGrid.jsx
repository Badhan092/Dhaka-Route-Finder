import BusCard from "@/components/buses/BusCard";
import EmptyState from "@/components/EmptyState";

export default function BusGrid({ buses }) {
  if (!buses.length) {
    return (
      <EmptyState
        title="No buses match your filter"
        description="Try shortening the bus name or checking the spelling of the stoppage area."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {buses.map((bus) => (
        <BusCard key={bus.slug} bus={bus} />
      ))}
    </div>
  );
}