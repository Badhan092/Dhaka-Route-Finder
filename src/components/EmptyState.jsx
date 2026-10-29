import { AlertCircle } from 'lucide-react';

export default function EmptyState({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto my-6 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 mb-3">{description}</p>}
      {children}
    </div>
  );
}
