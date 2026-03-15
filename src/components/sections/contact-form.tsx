"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
          {t("name_label")} *
        </label>
        <input
          type="text"
          id="contact-name"
          name="fullName"
          required
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
          {t("email_label")} *
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700">
          {t("subject_label")} *
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">
          {t("message_label")} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-[var(--segment-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--segment-primary)]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "..." : t("submit_label")}
      </button>

      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
