import React from "react";
import Link from 'next/link';
import { Bus } from 'lucide-react';

const Brand = ({ t, language }) => (
     
  <Link
    href="/"
    aria-label={t('Dhaka Bus Finder')}
    className="flex shrink-0 items-center gap-2.5"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
      <Bus className="h-5 w-5" aria-hidden="true" />
    </div>

    <div>
      <span className="block text-sm font-extrabold leading-tight sm:text-lg">
        {t('Dhaka Bus Finder')}
      </span>

      <span className="block text-[10px] font-semibold text-emerald-700">
        {language === 'bn'
          ? 'Dhaka Bus Finder'
          : 'ঢাকা বাস ফাইন্ডার'}
      </span>
    </div>
  </Link>
);

export default Brand;