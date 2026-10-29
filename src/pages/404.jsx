import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested bus route or page does not exist in the transit registry.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
