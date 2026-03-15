"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Segment } from "@/lib/constants/segments";

interface BookingInquiryFormProps {
  segment?: Segment;
  tourSlug?: string;
  tourTitle?: string;
}

export function BookingInquiryForm({
  segment,
  tourSlug,
  tourTitle,
}: BookingInquiryFormProps) {
  const t = useTranslations("booking");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      preferredDate: formData.get("preferredDate"),
      groupSize: formData.get("groupSize"),
      message: formData.get("message"),
      segment: segment || "general",
      tourSlug: tourSlug || "",
      tourTitle: tourTitle || "",
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-emerald-900">
          {t("success_title")}
        </h3>
        <p className="mt-2 text-emerald-700">{t("success_message")}</p>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {tourTitle ? `${t("book_tour")}: ${tourTitle}` : t("inquiry_title")}
          </h2>
          <p className="mt-2 text-gray-600">{t("inquiry_subtitle")}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                {t("full_name")} *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
              />
            </div>

            {/* Email & Phone row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("email")} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
                />
              </div>
            </div>

            {/* Date & Group size row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">
                  {t("preferred_date")}
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
                />
              </div>
              <div>
                <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700">
                  {t("group_size")}
                </label>
                <select
                  id="groupSize"
                  name="groupSize"
                  className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3-5">3-5</option>
                  <option value="6-10">6-10</option>
                  <option value="10+">10+</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t("message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-colors focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
            >
              {status === "loading" ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : null}
              {t("submit")}
            </button>

            {status === "error" && (
              <p className="text-center text-sm text-red-600">
                {t("error_message")}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
