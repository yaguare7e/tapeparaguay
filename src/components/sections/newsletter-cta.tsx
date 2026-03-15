"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function NewsletterCta() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[var(--segment-primary,#1B4332)] py-16 sm:py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="newsletter-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#newsletter-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-white/75">
          {t("description")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            required
            className="h-12 w-full max-w-sm rounded-lg border-0 bg-white/10 px-4 text-white placeholder-white/50 backdrop-blur-sm ring-1 ring-white/20 transition-all focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50 sm:w-80"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 w-full rounded-lg bg-white px-6 font-semibold text-[var(--segment-primary,#1B4332)] transition-all hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
          >
            {status === "loading" ? "..." : t("button")}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-emerald-300">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-300">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
