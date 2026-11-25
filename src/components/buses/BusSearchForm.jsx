import Link from "next/link";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

import { TYPE_OPTIONS } from "@/lib/busDirectory";
import { useLanguage } from "@/context/LanguageContext";
import { convertToBanglaNumber } from "@/utils/convertToBanglaNumber";

import SectionHead from "@/components/Layouts/SectionHead";
import Field from "@/components/Layouts/Field";



const FIELD ="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none";


const BusSearchForm = ({ filters, stops = [], busesCount = 0, isHome }) => {
  
  const { t, language } = useLanguage();
  const { q, stop, type } = filters;

  const isBn = language === "bn";
  const fmt = (n) => (isBn ? convertToBanglaNumber(n) : n);
  const hasFilters = Boolean(q || stop || type);

  return (
    <>
      <SectionHead
        id="all"
        title={t("All buses")}
        subtitle={t("buses.browseAll").replace("{n}", fmt(busesCount))}
      />

      <form
        action="/buses"
        method="GET"
        role="search"
        className={`mb-6 flex flex-col items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:p-5 ${
          isHome ? "" : "mt-6"
        }`}
      >
        <Field id="q" label={t("Search Bus Name")} Icon={Search}>
          <input
            id="q"
            name="q"
            type="search"
            maxLength={80}
            defaultValue={q}
            placeholder={t("search.busPlaceholder")}
            className={FIELD}
          />
        </Field>

        <Field id="stop" label={t("Serves Area / Stop")} Icon={MapPin}>
          <input
            id="stop"
            name="stop"
            type="search"
            list="stoplist"
            maxLength={80}
            defaultValue={stop}
            placeholder={t("search.stopPlaceholder")}
            className={FIELD}
          />
          <datalist id="stoplist">
            {stops.map((s) => (
              <option key={s.key} value={s.name} />
            ))}
          </datalist>
        </Field>

        <Field id="type" label={t("Service Type")} Icon={SlidersHorizontal}>
          <select id="type" name="type" defaultValue={type} className={FIELD}>
            <option value="">{t("All service types")}</option>
            {TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </Field>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:w-auto"
          >
            {t("Filter")}
          </button>

          {hasFilters && (
            <Link
              href="/buses"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              {t("Clear")}
            </Link>
          )}
        </div>
      </form>
    </>
  );
};

export default BusSearchForm;