"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export function FounderStory() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-gray-900 py-16 sm:py-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1758550713905-3083dc337a4a?w=1920&q=80)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-800 shadow-2xl">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1758550713905-3083dc337a4a?w=800&q=80)",
                }}
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-brand-accent p-6 shadow-xl sm:p-8">
              <div className="text-3xl font-bold text-white sm:text-4xl">
                4
              </div>
              <div className="text-sm font-medium text-white/80">
                {t("about.years_on_road")}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              {t("about.our_story_label")}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {t("about.hero_title")}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-300">
              <p>
                {t("about.story_p1")}
              </p>
              <p>
                {t("about.story_p2")}
              </p>
            </div>

            {/* Journey highlights */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-brand-accent">30K+</div>
                <div className="mt-1 text-xs text-gray-400">km</div>
              </div>
              <div className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-brand-accent">15</div>
                <div className="mt-1 text-xs text-gray-400">{t("about.countries")}</div>
              </div>
              <div className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-brand-accent">1</div>
                <div className="mt-1 text-xs text-gray-400">{t("about.home_found")}</div>
              </div>
            </div>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("common.cta_learn_more")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
