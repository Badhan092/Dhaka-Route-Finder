import React from "react";
import { Languages } from "lucide-react";

const LanguageSwitcher = ({ language, toggleLanguage }) => {

  const isEnglish = language === 'en';

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isEnglish ? 'Switch to Bangla' : 'Switch to English'}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100 sm:px-3"
    >
      <Languages className="h-4 w-4" aria-hidden="true" />

      <span>{isEnglish ? 'বাংলা' : 'English'}</span>
    </button>
  );
};

export default LanguageSwitcher;