'use client';
import React from 'react';

import { useRouter } from 'next/router';;
import { useLanguage } from '@/context/LanguageContext';

import Brand from '@/components/Layouts/Header/Brand';
import Navigation from '@/components/Layouts/Header/Navigation';
import LanguageSwitcher from '@/components/Layouts/Header/LanguageSwitcher';

const Header = () => {

  const { pathname: routePath, asPath } = useRouter();
  const { language, toggleLanguage, t } = useLanguage();

  const pathname = (routePath || asPath || '/').split('?')[0];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-4">

        <Brand t={t} language={language} />

        <Navigation pathname={pathname} t={t} />

        <LanguageSwitcher
          language={language}
          toggleLanguage={toggleLanguage}
        />

      </div>
    </header>
  );
};

export default Header;
