
'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bus, Bookmark, Compass, Search } from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
    icon: null,
    isActive: (pathname) => pathname === '/',
  },
  {
    label: 'Find a Bus',
    href: '/routes',
    icon: Search,
    isActive: (pathname) =>
      pathname === '/routes' || pathname === '/search',
    hideLabelOnMobile: true,
  },
  {
    label: 'Directory',
    href: '/buses',
    icon: Compass,
    isActive: (pathname) => pathname.startsWith('/buses'),
  },
  {
    label: 'Saved',
    href: '/saved',
    icon: Bookmark,
    isActive: (pathname) =>
      pathname === '/saved' || pathname.startsWith('/saved/'),
  },
];

export default function Header() {
  const { pathname: routePath, asPath } = useRouter();
  const pathname = (routePath || asPath || '/').split('?')[0];

  const getNavClassName = (active) =>
    `px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
      active
        ? 'bg-emerald-50 text-emerald-700 font-bold'
        : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-700/20">
            <Bus className="h-5 w-5" />
          </div>

          <div>
            <span className="block text-base font-extrabold leading-tight tracking-tight text-slate-900 sm:text-lg">
              Dhaka Bus Finder
            </span>
            <span className="block text-[10px] font-semibold leading-tight text-emerald-700">
              ঢাকা বাস ফাইন্ডার
            </span>
          </div>
        </Link>

        {/* Navigation */}
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
                  className={getNavClassName(active)}
                >
                  {Icon && <Icon className="h-4 w-4" />}

                  <span
                    className={
                      hideLabelOnMobile ? 'hidden sm:inline' : undefined
                    }
                  >
                    {label}
                  </span>
                </Link>
              );
            },
          )}
        </nav>
      </div>
    </header>
  );
}
