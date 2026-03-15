import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { locales } from "@/lib/i18n/locales";
import { BookingInquiryForm } from "@/components/sections/booking-inquiry-form";
import { TourSchema } from "@/components/seo/tour-schema";

const TOURS = [
  {
    slug: "chaco-wildlife-safari",
    title: "Chaco Wildlife Safari",
    description:
      "Explore the untamed Paraguayan Chaco — one of South America's last wild frontiers. Spot jaguars, peccaries, and 400+ bird species across the vast green desert where ancient quebracho forests stretch to the horizon.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    price: 450,
    duration: "4 days / 3 nights",
    difficulty: "Moderate",
    maxGroup: 12,
    highlights: [
      "Jaguar tracking with expert naturalists",
      "Night safari through the Chaco wilderness",
      "Visit to an indigenous Ayoreo community",
      "Hike through ancient quebracho forests",
      "Star gazing under pristine dark skies",
    ],
  },
  {
    slug: "pantanal-birdwatching",
    title: "Pantanal Birdwatching Expedition",
    description:
      "Discover the incredible avian biodiversity of the Paraguayan Pantanal, the world's largest tropical wetland. With over 700 species recorded, this is a birdwatcher's paradise.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    price: 380,
    duration: "3 days / 2 nights",
    difficulty: "Moderate",
    maxGroup: 10,
    highlights: [
      "Over 700 bird species in the region",
      "Wetland canoe trip at dawn",
      "Photography hides at feeding stations",
      "Sunrise walks through gallery forest",
      "Expert ornithologist guide throughout",
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) return { title: "Tour Not Found | Tape Paraguay" };
  return {
    title: `${tour.title} | Tape Paraguay`,
    description: tour.description.slice(0, 160),
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    TOURS.map((tour) => ({ locale, slug: tour.slug }))
  );
}

export default async function AdventureTourPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) notFound();

  const t = await getTranslations("tour_detail");
  const tn = await getTranslations("nav");

  return (
    <>
      <TourSchema
        name={tour.title}
        description={tour.description}
        url={`/${locale}/adventure/${tour.slug}`}
        image={tour.image}
        duration={tour.duration}
        price={tour.price}
        currency="USD"
        segment="adventure"
        difficulty={tour.difficulty}
        maxGroupSize={tour.maxGroup}
      />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${tour.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8">
          <Link
            href="/adventure"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t("back_to_tours")}
          </Link>
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            {tn("adventure")}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {tour.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">{t("duration")}</p>
                    <p className="font-semibold text-gray-900">{tour.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">{t("group_size")}</p>
                    <p className="font-semibold text-gray-900">{tour.maxGroup} {t("max_people")}</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">{t("overview")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{tour.description}</p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">{t("highlights")}</h2>
              <ul className="mt-4 space-y-3">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                <span className="text-sm text-gray-500">{t("price_from")}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-emerald-700">${tour.price}</span>
                  <span className="text-sm text-gray-500">USD / {t("per_person")}</span>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:opacity-90"
                >
                  {t("book_this_tour")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingInquiryForm segment="adventure" tourSlug={tour.slug} tourTitle={tour.title} />
    </>
  );
}
