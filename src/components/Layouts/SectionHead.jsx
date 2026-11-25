import Link from "next/link";
import { ArrowRight } from "lucide-react";

// eyebrow is optional, e.g. <SectionHead eyebrow="Directory" ... />
export default function SectionHead({ id, eyebrow, title, subtitle, href, hrefLabel }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 my-8">
      <div>
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 id={id} className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h2>
        {subtitle && <p className="text-sm sm:text-base text-slate-500 mt-1.5 max-w-2xl">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap text-sm font-semibold text-emerald-700 bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 px-4 py-2 rounded-full transition-colors"
        >
          {hrefLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}