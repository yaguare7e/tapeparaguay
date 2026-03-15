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

export function TaxCalcWidget() {
  const t = useTranslations("tools_tax_calc");
  const [income, setIncome] = useState("100000");
  const [country, setCountry] = useState("US");
  const [result, setResult] = useState<{
    currentTax: number;
    pyTax: number;
    savings: number;
  } | null>(null);

  function calculate() {
    const value = parseFloat(income);
    if (isNaN(value) || value <= 0) return;
    const rate = TAX_RATES[country]?.rate || 0.3;
    const currentTax = value * rate;
    // Territorial system: foreign income = 0% tax in PY
    const pyTax = 0;
    setResult({
      currentTax: Math.round(currentTax),
      pyTax,
      savings: Math.round(currentTax - pyTax),
    });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="income"
              className="block text-sm font-medium text-gray-700"
            >
              {t("annual_income")}
            </label>
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-3 pl-8 pr-4 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              {t("current_country")}
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
            >
              {Object.entries(TAX_RATES).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.name} (~{Math.round(info.rate * 100)}%)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculate}
            className="w-full rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:opacity-90"
          >
            {t("calculate")}
          </button>
        </div>
      </div>

      {result && (
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            {t("your_savings")}
          </h2>

          <div className="mt-6 space-y-4">
            {/* Current country bar */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("current_taxes")}</span>
                <span className="font-semibold text-red-600">
                  ${result.currentTax.toLocaleString()}
                </span>
              </div>
              <div className="mt-1.5 h-4 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-red-400 transition-all duration-700"
                  style={{
                    width: `${Math.min((result.currentTax / parseFloat(income)) * 100 * 2, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Paraguay bar */}
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("py_taxes")}</span>
                <span className="font-semibold text-emerald-600">
                  ${result.pyTax.toLocaleString()}
                </span>
              </div>
              <div className="mt-1.5 h-4 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                  style={{ width: "2%" }}
                />
              </div>
            </div>
          </div>

          {/* Savings card */}
          <div className="mt-6 rounded-xl bg-emerald-50 p-6 text-center">
            <p className="text-sm font-medium text-emerald-600">
              {t("annual_savings")}
            </p>
            <p className="mt-1 text-4xl font-bold text-emerald-700">
              ${result.savings.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-emerald-600">USD / year</p>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            * Assumes foreign-sourced income under Paraguay&apos;s territorial
            tax system. Actual savings depend on individual circumstances.
          </p>

          <Link
            href="/invest/tax-benefits"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--segment-primary,#1B4332)] px-6 py-3 text-base font-semibold text-[var(--segment-primary,#1B4332)] transition-colors hover:bg-[var(--segment-primary,#1B4332)] hover:text-white"
          >
            Learn more about Paraguay tax benefits
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
