import Link from "next/link";

export default function StopSuggestions({ field, from, to, suggestions }) {
  if (!suggestions.length) return null;

  const hrefFor = (name) => `/routes?${new URLSearchParams({
      from: field === "from" ? name : from,
      to: field === "to" ? name : to,
    })}`;

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-semibold text-slate-600">Did you mean one of these stops?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map((name) => (
          <Link
            key={name}
            href={hrefFor(name)}
            className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}