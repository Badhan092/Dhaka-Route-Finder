import Link from "next/link";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { TYPE_OPTIONS } from "@/lib/busDirectory";

const FIELD =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none";

function Field({ id, label, Icon, children }) {
  return (
    <div className="w-full flex-1">
      <label htmlFor={id} className="mb-1 block text-xs font-bold uppercase text-slate-500">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        {children}
      </div>
    </div>
  );
}

export default function BusSearchForm({ filters, stops, isHome }) {
  const { q, stop, type } = filters;

  return (
    <form
      action="/buses"
      method="GET"
      role="search"
      className={`${isHome ? "" : "mt-6 "}flex flex-col items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:p-5 mb-6`}
    >
      <Field id="q" label="Search Bus Name" Icon={Search}>
        <input
          id="q"
          name="q"
          type="search"
          maxLength={80}
          defaultValue={q}
          placeholder="e.g. Alif, Bikash, Achim..."
          className={FIELD}
        />
      </Field>

      <Field id="stop" label="Serves Area / Stop" Icon={MapPin}>
        <input
          id="stop"
          name="stop"
          type="search"
          list="stoplist"
          maxLength={80}
          defaultValue={stop}
          placeholder="e.g. Farmgate, Mirpur 10..."
          className={FIELD}
        />
        <datalist id="stoplist">
          {stops.map((s) => (
            <option key={s.key} value={s.name} />
          ))}
        </datalist>
      </Field>

      <Field id="type" label="Service Type" Icon={SlidersHorizontal}>
        <select id="type" name="type" defaultValue={type} className={FIELD}>
          <option value="">All service types</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex w-full items-center gap-2 sm:w-auto">
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          Filter
        </button>

        {(q || stop || type) && (
          <Link
            href="/buses"
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
          >
            Clear
          </Link>
        )}
      </div>
    </form>
  );
}