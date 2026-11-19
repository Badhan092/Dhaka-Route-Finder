import Link from "next/link";
import { RotateCcw } from "lucide-react";

const inputClass = "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none";

export default function FilterBar({ from, to, q, sort, directOnly }) {
  const resetHref = `/routes?${new URLSearchParams({ from, to })}`;

  return (
    <form
      action="/routes"
      method="GET"
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm"
    >
      <input type="hidden" name="from" value={from} />
      <input type="hidden" name="to" value={to} />

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
          className={inputClass}
        />
      </div>

      <div className="min-w-[140px]">
        <label htmlFor="sort" className="mb-1 block font-bold text-slate-500">
          Sort By
        </label>
        <select id="sort" name="sort" defaultValue={sort} className={inputClass}>
          <option value="stops">Fewest Stops</option>
          <option value="name">Bus Name (A–Z)</option>
        </select>
      </div>

      <label className="flex cursor-pointer select-none items-center gap-1.5 pt-5 font-semibold text-slate-700">
        <input
          type="checkbox"
          name="direct"
          value="1"
          defaultChecked={directOnly}
          className="rounded text-emerald-600 focus:ring-emerald-500"
        />
        <span>Direct only</span>
      </label>

      <div className="ml-auto flex items-center gap-2 pt-5">
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Apply Filters
        </button>
        <Link
          href={resetHref}
          className="p-2 text-slate-400 hover:text-slate-600"
          title="Reset Filters"
          aria-label="Reset Filters"
        >
          <RotateCcw className="h-4 w-4" />
        </Link>
      </div>
    </form>
  );
}