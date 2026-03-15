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
      "Explore the untamed Paraguayan Chaco — one of South America's last wild frontiers. Spot jaguars, peccaries, and 400+ bird species across the vast green desert where ancient quebracho forests stretch to the horizon. This multi-day expedition takes you deep into the heart of the Chaco with expert naturalist guides, staying at remote estancias and indigenous community lodges.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    price: 450,
    duration: "4 days / 3 nights",
    segment: "adventure",
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
    slug: "jesuit-missions-heritage-trail",
    title: "Jesuit Missions Heritage Trail",
    description:
      "Walk through UNESCO World Heritage sites — the Jesuit-Guarani Missions of Trinidad and Jesus de Tavarangue. These 17th-century ruins tell the story of one of history's most remarkable cultural experiments, where Jesuit priests and Guarani people built thriving communities that blended European and indigenous traditions.",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
    price: 320,
    duration: "3 days / 2 nights",
    segment: "culture",
    difficulty: "Easy",
    maxGroup: 15,
    highlights: [
      "Trinidad Mission ruins with sound & light show",
      "Jesus de Tavarangue's Moorish arches",
      "Local artisan workshop visit",
      "Guarani history museum tour",
      "Traditional lunch prepared by local families",
    ],
  },
  {
    slug: "paraguay-residency-fast-track",
    title: "Paraguay Residency Fast Track",
    description:
      "Complete residency consultation package: legal guidance, document preparation, and step-by-step support for obtaining permanent residency in Paraguay. Our expert team handles everything from bank account setup to immigration office appointments, ensuring a smooth and efficient process.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    price: 1500,
    duration: "Full program",
    segment: "invest",
    difficulty: "N/A",
    maxGroup: 1,
    highlights: [
      "One-on-one legal consultation",
      "Complete document preparation and translation",
      "Immigration office accompaniment",
      "Bank account setup assistance",
      "Paraguayan ID card processing",
    ],
  },
  {
    slug: "encarnacion-beach-weekend",
    title: "Encarnacion Beach Weekend",
    description:
      "Relax at Paraguay's Rivera del Parana — beach clubs, water sports, and the best nightlife outside Asuncion. Encarnacion's modern costanera features golden sand beaches, vibrant restaurants, and a summer atmosphere that has earned it the nickname 'the Paraguayan Miami'.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    price: 180,
    duration: "3 days / 2 nights",
    segment: "leisure",
    difficulty: "Easy",
    maxGroup: 20,
    highlights: [
      "Beach club day pass with loungers",
      "Sunset jet ski or kayak session",
      "Costanera sunset dinner cruise",
      "Carnival street tour (seasonal)",
      "Costanera nightlife experience",
    ],
  },
  {
    slug: "pantanal-birdwatching",
    title: "Pantanal Birdwatching Expedition",
    description:
      "Discover the incredible avian biodiversity of the Paraguayan Pantanal, the world's largest tropical wetland. With over 700 species recorded, this is a birdwatcher's paradise. Expert ornithologist guides lead you through marshes, lagoons, and gallery forests to spot rare and endemic species.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    price: 380,
    duration: "3 days / 2 nights",
    segment: "adventure",
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
  {
    slug: "asuncion-food-tour",
    title: "Asuncion Gastronomy Tour",
    description:
      "Taste your way through Asuncion's vibrant food scene, from traditional markets to innovative restaurants fusing Guarani and international cuisine. This full-day culinary adventure covers street food, artisan producers, craft breweries, and fine dining — all with the stories and culture behind each bite.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    price: 120,
    duration: "1 day",
    segment: "leisure",
    difficulty: "Easy",
    maxGroup: 12,
    highlights: [
      "Mercado 4 street food walk",
      "Chipa and sopa paraguaya tasting",
      "Craft beer brewery visit",
      "Fine dining experience at top restaurant",
      "Traditional terere ceremony",
    ],
  },
  {
    slug: "guarani-culture-immersion",
    title: "Guarani Culture Immersion",
    description:
      "Spend time with indigenous Guarani communities, learn about their traditions, crafts, and way of life in the heart of Paraguay. This respectful cultural exchange offers a window into one of South America's most resilient indigenous cultures, with homestay experiences and hands-on craft workshops.",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80",
    price: 280,
    duration: "2 days / 1 night",
    segment: "culture",
    difficulty: "Easy",
    maxGroup: 8,
    highlights: [
      "Community homestay experience",
      "Traditional crafts workshop (weaving & pottery)",
      "Guarani language lesson",
      "Forest medicine walk with elder",
      "Evening campfire storytelling",
    ],
  },
  {
    slug: "real-estate-investment-tour",
    title: "Real Estate Investment Tour",
    description:
      "Visit the most promising real estate developments in Asuncion and Encarnacion with expert analysis on ROI and market trends. This curated investment tour includes property visits, market briefings, legal framework overviews, and networking dinners with local developers and expat investors.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    price: 800,
    duration: "2 days / 1 night",
    segment: "invest",
    difficulty: "Easy",
    maxGroup: 5,
    highlights: [
      "Premium property visits in Asuncion",
      "Market analysis and ROI briefing",
      "Legal framework overview with attorney",
      "Investment projections workshop",
      "Networking dinner with developers",
    ],
  },
];

const SEGMENT_COLORS: Record<string, string> = {
  adventure: "bg-emerald-100 text-emerald-800",
  culture: "bg-rose-100 text-rose-800",
  invest: "bg-blue-100 text-blue-800",
  leisure: "bg-amber-100 text-amber-800",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) return { title: "Tour Not Found | Tape Paraguay" };
  const t = await getTranslations({ locale, namespace: "tour_detail" });
  return {
    title: `${tour.title} | Tape Paraguay`,
    description: tour.description.slice(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.description.slice(0, 160),
      images: [{ url: tour.image }],
    },
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    TOURS.map((tour) => ({ locale, slug: tour.slug }))
  );
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) notFound();

  const t = await getTranslations("tour_detail");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");

  return (
    <>
      <TourSchema
        name={tour.title}
        description={tour.description}
        url={`/${locale}/tours/${tour.slug}`}
        image={tour.image}
        duration={tour.duration}
        price={tour.price}
        currency="USD"
        segment={tour.segment}
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
            href="/tours"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            {t("back_to_tours")}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${SEGMENT_COLORS[tour.segment] || "bg-gray-100 text-gray-800"}`}
            >
              {tn(tour.segment)}
            </span>
            {tour.difficulty !== "N/A" && (
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {tour.difficulty}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {tour.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Quick facts */}
              <div className="mb-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">{t("duration")}</p>
                    <p className="font-semibold text-gray-900">
                      {tour.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">{t("group_size")}</p>
                    <p className="font-semibold text-gray-900">
                      {tour.maxGroup} {t("max_people")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <h2 className="text-2xl font-bold text-gray-900">
                {t("overview")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {tour.description}
              </p>

              {/* Highlights */}
              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                {t("highlights")}
              </h2>
              <ul className="mt-4 space-y-3">
                {tour.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* What's included */}
              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                {t("includes")}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "included_transport",
                  "included_meals",
                  "included_guide",
                  "included_accommodation",
                  "included_equipment",
                  "included_insurance",
                ].map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {t(key)}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    {t("price_from")}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[var(--segment-primary,#1B4332)]">
                      ${tour.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      USD / {t("per_person")}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("duration")}</span>
                    <span className="font-medium text-gray-900">
                      {tour.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("group_size")}</span>
                    <span className="font-medium text-gray-900">
                      {tour.maxGroup} {t("max_people")}
                    </span>
                  </div>
                  {tour.difficulty !== "N/A" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t("difficulty")}</span>
                      <span className="font-medium text-gray-900">
                        {tour.difficulty}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href="/contact"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                >
                  {t("book_this_tour")}
                  <svg
                    className="h-4 w-4"
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingInquiryForm
        segment={tour.segment as "adventure" | "culture" | "invest" | "leisure"}
        tourSlug={tour.slug}
        tourTitle={tour.title}
      />
    </>
  );
}
