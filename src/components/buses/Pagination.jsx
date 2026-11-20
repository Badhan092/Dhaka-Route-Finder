import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE = "flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2";

function PageLink({ href, rel, children }) {
  if (!href) {
    return (
      <span aria-disabled="true" className={`${BASE} cursor-not-allowed bg-slate-100 text-slate-400`}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      rel={rel}
      className={`${BASE} bg-white font-semibold text-slate-700 hover:border-emerald-500`}
    >
      {children}
    </Link>
  );
}

export default function Pagination({ currentPage, totalPages, filters }) {
  if (totalPages <= 1) return null;

  const activeFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
  const hrefFor = (page) => ({ pathname: "/buses", query: { ...activeFilters, page } });

  return (
    <nav
      aria-label="Bus directory pagination"
      className="mt-12 flex items-center justify-center gap-3 border-t border-slate-200 pt-6 text-sm"
    >
      <PageLink href={currentPage > 1 ? hrefFor(currentPage - 1) : null} rel="prev">
        <ChevronLeft className="h-4 w-4" /> Previous
      </PageLink>

      <span aria-current="page" className="px-2 font-medium text-slate-600">
        Page {currentPage} of {totalPages}
      </span>

      <PageLink href={currentPage < totalPages ? hrefFor(currentPage + 1) : null} rel="next">
        Next <ChevronRight className="h-4 w-4" />
      </PageLink>
    </nav>
  );
}