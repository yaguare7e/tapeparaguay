"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const RATES: Record<string, number> = {
  USD: 1,
  PYG: 7300,
  EUR: 0.92,
  GBP: 0.79,
  BRL: 5.03,
  ARS: 890,
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",
  PYG: "Guarani (PYG)",
  EUR: "Euro (EUR)",
  GBP: "British Pound (GBP)",
  BRL: "Brazilian Real (BRL)",
  ARS: "Argentine Peso (ARS)",
};

export function CurrencyWidget() {
  const t = useTranslations("tools_currency");
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PYG");
  const [result, setResult] = useState<string | null>(null);

  function convert() {
    const value = parseFloat(amount);
    if (isNaN(value)) return;
    const inUsd = value / RATES[from];
    const converted = inUsd * RATES[to];
    setResult(
      converted.toLocaleString("en-US", {
        minimumFractionDigits: to === "PYG" || to === "ARS" ? 0 : 2,
        maximumFractionDigits: to === "PYG" || to === "ARS" ? 0 : 2,
      })
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 sm:p-8">
      <div className="space-y-5">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            {t("amount")}
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="from"
              className="block text-sm font-medium text-gray-700"
            >
              {t("from")}
            </label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
            >
              {Object.keys(RATES).map((c) => (
                <option key={c} value={c}>
                  {CURRENCY_NAMES[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700"
            >
              {t("to")}
            </label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
            >
              {Object.keys(RATES).map((c) => (
                <option key={c} value={c}>
                  {CURRENCY_NAMES[c]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={convert}
          className="w-full rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:opacity-90"
        >
          {t("convert")}
        </button>

        {result && (
          <div className="rounded-xl bg-emerald-50 p-6 text-center">
            <p className="text-sm text-emerald-600">{t("result")}</p>
            <p className="mt-1 text-3xl font-bold text-emerald-900">
              {result} {to}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
