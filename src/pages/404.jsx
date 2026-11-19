
import React from 'react';
import { useRouter } from 'next/navigation';
import BusLottie from '@/components/Lottie/BusLottie';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full">
        <BusLottie />
        <p className="text-5xl font-extrabold text-emerald-600 mt-2">404</p>
        <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-2">
          This bus took a wrong turn
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested bus route or page does not exist in the transit registry.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}