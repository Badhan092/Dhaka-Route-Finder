export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-16 text-center text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p className="font-semibold text-slate-700">
          Dhaka Bus Finder (ঢাকা বাস ফাইন্ডার) — Metropolitan Commuter Transit Guide
        </p>
        <p>
          Data sourced from Dhaka City transit records. Fares and stop sequences reflect BRTA & local operator routes.
        </p>
      </div>
    </footer>
  );
}
