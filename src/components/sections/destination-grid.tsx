"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";

interface Destination {
  title: string;
  slug: string;
  region: string;
  heroImage: { url: string; alt: string } | null;
}

interface DestinationGridProps {
  destinations: Destination[];
}

const PLACEHOLDER_DESTINATIONS: Destination[] = [
  {
    title: "Asuncion",
    slug: "asuncion",
    region: "Central",
    heroImage: {
      url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80",
      alt: "Asuncion Paraguay",
    },
  },
  {
    title: "Encarnacion",
    slug: "encarnacion",
    region: "Itapua",
    heroImage: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      alt: "Encarnacion beach",
    },
  },
  {
    title: "Gran Chaco",
    slug: "gran-chaco",
    region: "Chaco",
    heroImage: {
      url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
      alt: "Chaco region",
    },
  },
  {
    title: "Jesuit Missions",
    slug: "jesuit-missions",
    region: "Misiones",
    heroImage: {
      url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
      alt: "Jesuit ruins",
    },
  },
  {
    title: "Ybycui National Park",
    slug: "ybycui-national-park",
    region: "Paraguari",
    heroImage: {
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
      alt: "Ybycui waterfalls",
    },
  },
  {
    title: "Ciudad del Este",
    slug: "ciudad-del-este",
    region: "Alto Parana",
    heroImage: {
      url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
      alt: "Ciudad del Este",
    },
  },
];

export function DestinationGrid({ destinations }: DestinationGridProps) {
  const t = useTranslations();
  const displayDestinations =
    destinations.length > 0 ? destinations : PLACEHOLDER_DESTINATIONS;

  return (
    <section className="bg-[var(--segment-bg,#FAFAF5)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("home.destinations_title")}
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            {t("home.destinations_subtitle")}
          </p>
        </div>

        {/* Grid — featured bento layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayDestinations.slice(0, 6).map((dest, index) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}` as never}
              className={`group relative overflow-hidden rounded-xl ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3]"
                }`}
              >
                {dest.heroImage ? (
                  <Image
                    src={dest.heroImage.url}
                    alt={dest.heroImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      index === 0
                        ? "(max-width: 640px) 100vw, 66vw"
                        : "(max-width: 640px) 100vw, 33vw"
                    }
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3
                    className={`font-bold text-white ${
                      index === 0 ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {dest.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">{dest.region}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-[var(--segment-primary,#1B4332)] font-semibold hover:underline"
          >
            {t("common.cta_view_all")} {t("nav.destinations")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
