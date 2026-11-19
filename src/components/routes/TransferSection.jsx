import Link from "next/link";
import { Shuffle } from "lucide-react";

function BusLeg({ bus, label }) {
  return (
    <div className="rounded-xl bg-slate-50 p-2.5">
      <span className="block text-sm font-bold text-slate-900">
        <Link href={`/buses/${bus.slug}`} className="hover:text-emerald-600">
          {bus.name}
        </Link>
      </span>
      <span className="text-slate-600">{label}</span>
    </div>
  );
}

function TransferCard({ transfer, index, from, to }) {
  const { a, b, at, s1, s2, total } = transfer;

  return (
    <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800">
          1 Transfer · {total} Total Stops
        </span>
        <span className="text-xs text-slate-400">Option #{index + 1}</span>
      </div>

      <div className="space-y-2 text-xs">
        <BusLeg bus={a} label={`${from} ➔ ${at} (${s1.count} stops)`} />
        <div className="rounded-lg bg-emerald-50/80 py-1 text-center font-bold text-emerald-700">
          Transfer at {at}
        </div>
        <BusLeg bus={b} label={`${at} ➔ ${to} (${s2.count} stops)`} />
      </div>
    </article>
  );
}

export default function TransferSection({ transfers, from, to }) {
  if (!transfers.length) return null;

  return (
    <section className="mt-12 space-y-4 border-t border-slate-200 pt-6">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-amber-100 p-1.5 text-amber-800">
          <Shuffle className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Alternative Transfer Options (1 Change)</h3>
          <p className="text-xs text-slate-500">Switch buses at the indicated interchange stop.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {transfers.map((x, i) => (
          <TransferCard
            key={`${x.a.slug}-${x.b.slug}-${x.at}-${i}`}
            transfer={x}
            index={i}
            from={from}
            to={to}
          />
        ))}
      </div>
    </section>
  );
}