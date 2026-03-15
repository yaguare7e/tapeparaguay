"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { SEGMENTS, SEGMENT_CONFIG, type Segment } from "@/lib/constants/segments";

const SEGMENT_IMAGES: Record<Segment, string> = {
  adventure:
    "https://images.unsplash.com/photo-1769794142260-c4115835231a?w=600&q=80",
  culture:
    "https://images.unsplash.com/photo-1620736663824-18f7d3a79d54?w=600&q=80",
  invest:
    "https://images.unsplash.com/photo-1758519289559-f4d0ead39634?w=600&q=80",
  leisure:
    "https://images.unsplash.com/photo-1575377606545-7a8d394925e8?w=600&q=80",
};

const SEGMENT_DESCRIPTIONS: Record<Segment, string> = {
  adventure: "segment_cards.adventure_desc",
  culture: "segment_cards.culture_desc",
  invest: "segment_cards.invest_desc",
  leisure: "segment_cards.leisure_desc",
};

export function SegmentCards() {
  const t = useTranslations();

  return (
    <section className="relative z-10 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SEGMENTS.map((segment) => (
          <Link
            key={segment}
            href={`/${segment}` as "/adventure" | "/culture" | "/invest" | "/leisure"}
            className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${SEGMENT_IMAGES[segment]})`,
              }}
            />

            {/* Gradient overlay */}
            <div
              data-segment={segment}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            />

            {/* Content */}
            <div className="relative flex h-64 flex-col justify-end p-6">
              <span className="mb-2 text-3xl">
                {SEGMENT_CONFIG[segment].icon}
              </span>
              <h3 className="text-xl font-bold text-white">
                {t(`nav.${segment}`)}
              </h3>
              <p className="mt-1 text-sm text-white/75 line-clamp-2">
                {t(SEGMENT_DESCRIPTIONS[segment])}
              </p>
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                {t("common.cta_learn_more")}
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
