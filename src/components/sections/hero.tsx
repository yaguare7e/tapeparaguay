"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import type { Segment } from "@/lib/constants/segments";

interface HeroProps {
  segment?: Segment;
  customTitle?: string;
  customSubtitle?: string;
  customCta?: { label: string; href: string };
  className?: string;
}

const SEGMENT_BACKGROUNDS: Record<string, string> = {
  default:
    "https://images.unsplash.com/photo-1646097009669-4779e34e5dd5?w=1920&q=80",
  adventure:
    "https://images.unsplash.com/photo-1769794142260-c4115835231a?w=1920&q=80",
  culture:
    "https://images.unsplash.com/photo-1579957023433-7fad5b83efae?w=1920&q=80",
  invest:
    "https://images.unsplash.com/photo-1758519289559-f4d0ead39634?w=1920&q=80",
  leisure:
    "https://images.unsplash.com/photo-1649275579015-5092d2ffcf2b?w=1920&q=80",
};

export function Hero({
  segment,
  customTitle,
  customSubtitle,
  customCta,
  className,
}: HeroProps) {
  const t = useTranslations();
  const ns = segment || "home";

  const title = customTitle || t(`${ns}.hero_title`);
  const subtitle = customSubtitle || t(`${ns}.hero_subtitle`);
  const bgImage = SEGMENT_BACKGROUNDS[segment || "default"];

  return (
    <section
      className={cn(
        "relative flex min-h-[85vh] items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Founder quote on homepage */}
        {!segment && (
          <p className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
            &ldquo;4 years. 30,000 km. 15 countries. One destination that made me stay.&rdquo;
            <span className="ml-2 text-brand-accent">— Francisco Zubia</span>
          </p>
        )}

        <h1
          className={cn(
            "font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl",
            segment === "invest" && "md:text-5xl lg:text-6xl"
          )}
        >
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {customCta ? (
            <Link
              href={customCta.href as never}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-white px-8 text-lg font-semibold text-gray-900 shadow-xl transition-all hover:bg-gray-100 hover:shadow-2xl"
            >
              {customCta.label}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          ) : (
            <>
              <Link
                href="/destinations"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-white px-8 text-lg font-semibold text-gray-900 shadow-xl transition-all hover:bg-gray-100 hover:shadow-2xl"
              >
                {t("common.cta_explore")}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-white/40 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
              >
                {t("common.cta_contact")}
              </Link>
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="mx-auto h-6 w-6 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
