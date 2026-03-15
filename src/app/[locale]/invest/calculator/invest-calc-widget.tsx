"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

const TAX_RATES: Record<string, { name: string; rate: number }> = {
  US: { name: "United States", rate: 0.32 },
  UK: { name: "United Kingdom", rate: 0.4 },
  DE: { name: "Germany", rate: 0.42 },
  ES: { name: "Spain", rate: 0.43 },
  FR: { name: "France", rate: 0.41 },
  AR: { name: "Argentina", rate: 0.35 },
  BR: { name: "Brazil", rate: 0.275 },
  AU: { name: "Australia", rate: 0.37 },
  CA: { name: "Canada", rate: 0.33 },
};

const INCOME_SOURCES = [
  "source_remote",
  "source_business",
  "source_investments",
  "source_retirement",
] as const;

export function InvestCalcWidget() {
  const t = useTranslations("invest_calculator");
  const [income, setIncome] = useState("100000");
  const [country, setCountry] = useState("US");
  const [source, setSource] = useState("source_remote");
  const [result, setResult] = useState<{
    currentTax: number;
    pyTax: number;
    savings: number;
    currentRate: number;
    pyRate: number;
  } | null>(null);

  function calculate() {
    const value = parseFloat(income);
    if (isNaN(value) || value <= 0) return;
    const rate = TAX_RATES[country]?.rate || 0.3;
    const currentTax = value * rate;
    // Territorial system: foreign income = 0%, local business = 10%
    const pyRate = source === "source_business" ? 0.1 : 0;
    const pyTax = value * pyRate;
    setResult({
      currentTax: Math.round(currentTax),
      pyTax: Math.round(pyTax),
      savings: Math.round(currentTax - pyTax),
      currentRate: Math.round(rate * 100),
      pyRate: Math.round(pyRate * 100),
    });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="income" className="block text-sm font-medium text-gray-700">
              {t("annual_income")}
            </label>
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-3 pl-8 pr-4 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              {t("current_country")}
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {Object.entries(TAX_RATES).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.name} (~{Math.round(info.rate * 100)}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("income_source")}
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {INCOME_SOURCES.map((src) => (
                <label
                  key={src}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                    source === src
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="source"
                    value={src}
                    checked={source === src}
                    onChange={() => setSource(src)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      source === src ? "border-blue-600" : "border-gray-400"
                    }`}
                  >
                    {source === src && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </span>
                  <span className="text-sm font-medium">{t(src)}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full rounded-lg bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-800"
          >
            {t("calculate")}
          </button>
        </div>
      </div>

      {result && (
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">{t("results_title")}</h2>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("current_tax")}</span>
                <span className="font-semibold text-red-600">
                  ${result.currentTax.toLocaleString()} ({result.currentRate}%)
                </span>
              </div>
              <div className="mt-1.5 h-5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="flex h-full items-center justify-end rounded-full bg-red-400 pr-2 text-xs font-medium text-white transition-all duration-700"
                  style={{ width: `${Math.min(result.currentRate * 2, 100)}%` }}
                >
                  {result.currentRate}%
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("paraguay_tax")}</span>
                <span className="font-semibold text-emerald-600">
                  ${result.pyTax.toLocaleString()} ({result.pyRate}%)
                </span>
              </div>
              <div className="mt-1.5 h-5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="flex h-full items-center rounded-full bg-emerald-400 px-2 text-xs font-medium text-white transition-all duration-700"
                  style={{ width: `${Math.max(result.pyRate * 2, 3)}%` }}
                >
                  {result.pyRate}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-emerald-50 p-6 text-center">
            <p className="text-sm font-medium text-emerald-600">{t("savings")}</p>
            <p className="mt-1 text-4xl font-bold text-emerald-700">
              ${result.savings.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-emerald-600">USD / year</p>
          </div>

          <p className="mt-4 text-xs text-gray-500">{t("note")}</p>

          <Link
            href="/contact"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-800"
          >
            {t("cta")}
          </Link>
        </div>
      )}
    </div>
  );
}
