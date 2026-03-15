"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";

interface Tour {
  title: string;
  slug: string;
  shortDescription: string;
  heroImage: { url: string; alt: string } | null;
  price: { amount: number; currency: string; per: string } | null;
  duration: string;
  difficulty?: string;
  segment: string;
  featured: boolean;
}

interface FeaturedToursProps {
  tours: Tour[];
}

const PLACEHOLDER_TOURS: Tour[] = [
  {
    title: "Chaco Wildlife Safari",
    slug: "chaco-wildlife-safari",
    shortDescription:
      "Explore the untamed Paraguayan Chaco — one of South America's last wild frontiers. Spot jaguars, peccaries, and 400+ bird species.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1717634546865-d5be86225c4a?w=600&q=80",
      alt: "Chaco wildlife",
    },
    price: { amount: 450, currency: "USD", per: "person" },
    duration: "4 days / 3 nights",
    difficulty: "moderate",
    segment: "adventure",
    featured: true,
  },
  {
    title: "Jesuit Missions Heritage Trail",
    slug: "jesuit-missions-heritage-trail",
    shortDescription:
      "Walk through UNESCO World Heritage sites — the Jesuit-Guarani Missions of Trinidad and Jesus de Tavarangue.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1620736663824-18f7d3a79d54?w=600&q=80",
      alt: "Jesuit Missions",
    },
    price: { amount: 320, currency: "USD", per: "person" },
    duration: "3 days / 2 nights",
    difficulty: "easy",
    segment: "culture",
    featured: true,
  },
  {
    title: "Paraguay Residency Fast Track",
    slug: "paraguay-residency-fast-track",
    shortDescription:
      "Complete residency consultation package: legal guidance, document preparation, and step-by-step support for permanent residency.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1758519289559-f4d0ead39634?w=600&q=80",
      alt: "Paraguay investment",
    },
    price: { amount: 1500, currency: "USD", per: "package" },
    duration: "Full program",
    segment: "invest",
    featured: true,
  },
  {
    title: "Encarnacion Beach Weekend",
    slug: "encarnacion-beach-weekend",
    shortDescription:
      "Relax at Paraguay's Rivera del Parana — beach clubs, water sports, and the best nightlife outside Asuncion.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1575377606545-7a8d394925e8?w=600&q=80",
      alt: "Encarnacion beach",
    },
    price: { amount: 180, currency: "USD", per: "person" },
    duration: "3 days / 2 nights",
    difficulty: "easy",
    segment: "leisure",
    featured: true,
  },
];

const SEGMENT_COLORS: Record<string, string> = {
  adventure: "bg-emerald-100 text-emerald-800",
  culture: "bg-rose-100 text-rose-800",
  invest: "bg-blue-100 text-blue-800",
  leisure: "bg-amber-100 text-amber-800",
};

export function FeaturedTours({ tours }: FeaturedToursProps) {
  const t = useTranslations();
  const displayTours = tours.length > 0 ? tours : PLACEHOLDER_TOURS;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("home.featured_tours_title")}
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            {t("home.featured_tours_subtitle")}
          </p>
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayTours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/${tour.segment}/${tour.slug}` as never}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {tour.heroImage ? (
                  <Image
                    src={tour.heroImage.url}
                    alt={tour.heroImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
                <div className="absolute left-3 top-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                      SEGMENT_COLORS[tour.segment] || "bg-gray-100 text-gray-800"
                    )}
                  >
                    {t(`nav.${tour.segment}`)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--segment-primary)]">
                  {tour.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-gray-600 line-clamp-2">
                  {tour.shortDescription}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tour.duration}
                  </div>
                  {tour.price && (
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{t("common.from")}</span>
                      <span className="ml-1 text-base font-bold text-[var(--segment-primary,#1B4332)]">
                        ${tour.price.amount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-[var(--segment-primary,#1B4332)] font-semibold hover:underline"
          >
            {t("common.cta_see_all_tours")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
