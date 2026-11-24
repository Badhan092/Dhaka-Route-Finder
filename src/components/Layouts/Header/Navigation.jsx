import React from "react";
import Link from 'next/link';

import {  Bookmark, Compass,  Search,} from 'lucide-react';



const NAV_ITEMS = [
  {label: 'Home',href: '/',isActive: (pathname) => pathname === '/',},
  {label: 'Find a Bus', href: '/routes',icon: Search,isActive: (pathname) =>['/routes', '/search'].includes(pathname),hideLabelOnMobile: true,},
  {label: 'Directory', href: '/buses',icon: Compass,isActive: (pathname) => pathname.startsWith('/buses'),},
  {label: 'Saved', href: '/saved',icon: Bookmark,isActive: (pathname) =>pathname === '/saved' || pathname.startsWith('/saved/'),},
];

const getNavClassName = (isActive) => {

  const baseClasses =  'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors';
  const stateClasses = isActive  ? 'bg-emerald-50 font-bold text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600';

  return `${baseClasses} ${stateClasses}`;

};

const Navigation = ({ pathname, t }) => (
  

  <nav
    aria-label="Main navigation"
    className="flex items-center gap-1 text-sm font-medium sm:gap-2"
  >
    {NAV_ITEMS.map(
      ({ label, href, icon: Icon, isActive, hideLabelOnMobile }) => {
        const active = isActive(pathname);

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            aria-label={t(label)}
            title={t(label)}
            className={getNavClassName(active)}
          >
            {Icon && (
              <Icon
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            )}

            <span className={hideLabelOnMobile ? 'hidden sm:inline' : ''}>
              {t(label)}
            </span>
          </Link>
        );
      },
    )}
  </nav>
);

export default Navigation;