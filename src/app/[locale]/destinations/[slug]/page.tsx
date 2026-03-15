import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { locales } from "@/lib/i18n/locales";

const DESTINATIONS = [
  {
    slug: "asuncion",
    name: "Asuncion",
    description:
      "The vibrant capital of Paraguay sits on the banks of the Paraguay River, blending colonial architecture with modern development. Asuncion is a city of contrasts — centuries-old buildings stand alongside sleek towers, traditional markets coexist with gourmet restaurants, and the relaxed pace of Paraguayan life persists amid growing cosmopolitan energy. From the historic Cabildo to the bustling Mercado 4, the city offers a fascinating window into the country's past and future.",
    image:
      "https://images.unsplash.com/photo-1655775130609-642423db9ff9?w=1200&q=80",
    region: "Central",
    climate: "Subtropical humid — hot summers, mild winters",
    bestTime: "May to September",
    highlights: [
      "Historic downtown and the Cabildo",
      "Mercado 4 — the largest open market",
      "Costanera promenade along the river",
      "Villa Morra gastronomy district",
      "Museo del Barro — art and indigenous culture",
    ],
  },
  {
    slug: "encarnacion",
    name: "Encarnacion",
    description:
      "Known as the 'Pearl of the South', Encarnacion is Paraguay's beach capital. Its modern costanera along the Parana River features golden sand beaches, water sports, and a vibrant carnival season that rivals the best in South America. The city also serves as the gateway to the UNESCO Jesuit Missions of Trinidad and Jesus, and hosts a thriving Japanese-Paraguayan community with its own cultural district.",
    image:
      "https://images.unsplash.com/photo-1649275579015-5092d2ffcf2b?w=1200&q=80",
    region: "Itapua",
    climate: "Subtropical — warm year-round, milder than Asuncion",
    bestTime: "January-February (Carnival), May-September (mild weather)",
    highlights: [
      "Costanera beach and waterfront",
      "Carnival Encarnaceno (Jan-Feb)",
      "Jesuit Missions nearby (Trinidad & Jesus)",
      "Japanese colony and cultural district",
      "Emerging wine region",
    ],
  },
  {
    slug: "chaco",
    name: "Gran Chaco",
    description:
      "The Gran Chaco covers 60% of Paraguay's territory but holds less than 3% of its population. This vast, wild frontier ranges from palm savannas near the Paraguay River to dry scrubland and ancient quebracho forests in the west. It is one of South America's last true wilderness areas, home to jaguars, giant armadillos, and over 400 bird species. The Mennonite colonies of Filadelfia and Loma Plata offer surprising oases of dairy farming culture.",
    image:
      "https://images.unsplash.com/photo-1585318822320-300abf39f65d?w=1200&q=80",
    region: "Occidental (Boreal, Presidente Hayes, Alto Paraguay)",
    climate: "Semi-arid to hot — extreme temperatures possible",
    bestTime: "June to August (cooler, best wildlife)",
    highlights: [
      "Trans-Chaco Highway adventure",
      "Mennonite colonies (Filadelfia, Loma Plata)",
      "Wildlife safaris — jaguars, tapirs, peccaries",
      "Indigenous Ayoreo and Nivacle communities",
      "Cerro Leon natural monument",
    ],
  },
  {
    slug: "ciudad-del-este",
    name: "Ciudad del Este",
    description:
      "Paraguay's second-largest city is a commercial powerhouse on the Brazilian border, connected to Foz do Iguacu by the Friendship Bridge. Beyond its famous duty-free shopping district, Ciudad del Este offers access to the mighty Itaipu Dam — the world's largest hydroelectric plant — and the stunning Monday Falls (Salto Monday), a 45-meter waterfall just minutes from the city center.",
    image:
      "https://images.unsplash.com/photo-1655425541685-c3d9b0672d9f?w=1200&q=80",
    region: "Alto Parana",
    climate: "Subtropical humid — hot and rainy in summer",
    bestTime: "April to October",
    highlights: [
      "Duty-free shopping district",
      "Itaipu Dam — world's largest hydroelectric",
      "Monday Falls (Salto Monday)",
      "Triple Frontier viewpoint",
      "Acaray and Monday rivers",
    ],
  },
  {
    slug: "san-bernardino",
    name: "San Bernardino",
    description:
      "The charming summer resort town of San Bernardino sits on the shores of Lake Ypacarai, just an hour from Asuncion. During the warmer months, it transforms into the social capital of Paraguay, with beach clubs, water sports, live music venues, and packed restaurants along the lakefront. The town also features lovely colonial German architecture, a legacy of its 19th-century founders.",
    image:
      "https://images.unsplash.com/photo-1769794142260-c4115835231a?w=1200&q=80",
    region: "Cordillera",
    climate: "Subtropical — warm summers, cool winters",
    bestTime: "October to March (summer season)",
    highlights: [
      "Lake Ypacarai swimming and water sports",
      "Summer nightlife and beach clubs",
      "Colonial German architecture",
      "Artisan markets on weekends",
      "Weekend getaway from Asuncion",
    ],
  },
  {
    slug: "ybycui",
    name: "Ybycui National Park",
    description:
      "Paraguay's premier national park protects a stunning area of Atlantic Forest with waterfalls, hiking trails, and rich biodiversity. The park is home to the historic La Rosada iron foundry, a relic of the War of the Triple Alliance. Crystal-clear streams cascade into swimming holes, and the forest canopy shelters hundreds of bird species, making it a paradise for hikers and nature lovers.",
    image:
      "https://images.unsplash.com/photo-1723784037687-edb3a4959c22?w=1200&q=80",
    region: "Paraguari",
    climate: "Subtropical — cooler due to elevation",
    bestTime: "Year-round (avoid heavy rains Dec-Feb)",
    highlights: [
      "Multiple waterfalls and swimming holes",
      "Hiking trails through Atlantic Forest",
      "Historic La Rosada iron foundry",
      "Excellent bird watching (300+ species)",
      "Camping under the forest canopy",
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination Not Found | Tape Paraguay" };
  return {
    title: `${dest.name} — Paraguay | Tape Paraguay`,
    description: dest.description.slice(0, 160),
    openGraph: {
      title: `${dest.name} — Paraguay`,
      description: dest.description.slice(0, 160),
      images: [{ url: dest.image }],
    },
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    DESTINATIONS.map((d) => ({ locale, slug: d.slug }))
  );
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const dest = DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) notFound();

  const t = await getTranslations("destination_detail");
  const tc = await getTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${dest.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8">
          <Link
            href="/destinations"
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
            {t("back_to_destinations")}
          </Link>
          <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {dest.name}
          </h1>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {dest.region}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {t("overview")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                {dest.description}
              </p>

              {/* Highlights */}
              <h2 className="mt-10 text-2xl font-bold text-gray-900">
                {t("highlights")}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {dest.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-3 rounded-lg bg-gray-50 p-4"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--segment-primary,#1B4332)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <span className="text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <h3 className="font-semibold text-gray-900">
                    {t("best_time")}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{dest.bestTime}</p>

                  <h3 className="mt-5 font-semibold text-gray-900">
                    {t("climate")}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{dest.climate}</p>

                  <h3 className="mt-5 font-semibold text-gray-900">
                    {t("region")}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{dest.region}</p>
                </div>

                <Link
                  href="/tours"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:opacity-90"
                >
                  {t("tours_here")}
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
    </>
  );
}
