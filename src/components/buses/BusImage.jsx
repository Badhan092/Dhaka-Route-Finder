'use client';

import { useState } from 'react';
import { Bus } from 'lucide-react';

export default function BusImage({ src, alt }) {
  const [error, setError] = useState(!src);

  if (error || !src) {
    return (
      <div
        className="w-full aspect-video rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center text-emerald-600"
        role="img"
        aria-label={`${alt} (no image)`}
      >
        <Bus className="w-10 h-10 stroke-[1.5]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
      className="w-full aspect-video rounded-xl object-cover border border-slate-200 shadow-sm"
    />
  );
}
