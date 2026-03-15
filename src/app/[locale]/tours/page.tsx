import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const th = await getTranslations({ locale, namespace: "home" });
  return {
    title: `${t("tours")} | Tape Paraguay`,
    description: th("featured_tours_subtitle"),
  };
}

const PLACEHOLDER_TOURS = [
  {
    slug: "chaco-wildlife-safari",
    title: "Chaco Wildlife Safari",
    description: "Explore the untamed Paraguayan Chaco — one of South America's last wild frontiers. Spot jaguars, peccaries, and 400+ bird species.",
    image: "https://images.unsplash.com/photo-1585318822320-300abf39f65d?w=600&q=80",
    price: 450,
    duration: "4 days / 3 nights",
    segment: "adventure",
  },
  {
    slug: "jesuit-missions-heritage-trail",
    title: "Jesuit Missions Heritage Trail",
    description: "Walk through UNESCO World Heritage sites — the Jesuit-Guarani Missions of Trinidad and Jesus de Tavarangue.",
    image: "https://images.unsplash.com/photo-1579957023433-7fad5b83efae?w=600&q=80",
    price: 320,
    duration: "3 days / 2 nights",
    segment: "culture",
  },
  {
    slug: "paraguay-residency-fast-track",
    title: "Paraguay Residency Fast Track",
    description: "Complete residency consultation package: legal guidance, document preparation, and step-by-step support for permanent residency.",
    image: "https://images.unsplash.com/photo-1758519289559-f4d0ead39634?w=600&q=80",
    price: 1500,
    duration: "Full program",
    segment: "invest",
  },
  {
    slug: "encarnacion-beach-weekend",
    title: "Encarnacion Beach Weekend",
    description: "Relax at Paraguay's Rivera del Parana — beach clubs, water sports, and the best nightlife outside Asuncion.",
    image: "https://images.unsplash.com/photo-1649275579015-5092d2ffcf2b?w=600&q=80",
    price: 180,
    duration: "3 days / 2 nights",
    segment: "leisure",
  },
  {
    slug: "pantanal-birdwatching",
    title: "Pantanal Birdwatching Expedition",
    description: "Discover the incredible avian biodiversity of the Paraguayan Pantanal, the world's largest tropical wetland.",
    image: "https://images.unsplash.com/photo-1723784037687-edb3a4959c22?w=600&q=80",
    price: 380,
    duration: "3 days / 2 nights",
    segment: "adventure",
  },
  {
    slug: "asuncion-food-tour",
    title: "Asuncion Gastronomy Tour",
    description: "Taste your way through Asuncion's vibrant food scene, from traditional markets to innovative restaurants fusing Guarani and international cuisine.",
    image: "https://images.unsplash.com/photo-1655425541685-c3d9b0672d9f?w=600&q=80",
    price: 120,
    duration: "1 day",
    segment: "leisure",
  },
  {
    slug: "guarani-culture-immersion",
    title: "Guarani Culture Immersion",
    description: "Spend time with indigenous Guarani communities, learn about their traditions, crafts, and way of life in the heart of Paraguay.",
    image: "https://images.unsplash.com/photo-1655775130609-642423db9ff9?w=600&q=80",
    price: 280,
    duration: "2 days / 1 night",
    segment: "culture",
  },
  {
    slug: "real-estate-investment-tour",
    title: "Real Estate Investment Tour",
    description: "Visit the most promising real estate developments in Asuncion and Encarnacion with expert analysis on ROI and market trends.",
    image: "https://images.unsplash.com/photo-1646097009669-4779e34e5dd5?w=600&q=80",
    price: 800,
    duration: "2 days / 1 night",
    segment: "invest",
  },
];

const SEGMENT_COLORS: Record<string, string> = {
  adventure: "bg-emerald-100 text-emerald-800",
  culture: "bg-rose-100 text-rose-800",
  invest: "bg-blue-100 text-blue-800",
  leisure: "bg-amber-100 text-amber-800",
};

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            {t("featured_tours_title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t("featured_tours_subtitle")}
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLACEHOLDER_TOURS.map((tour) => (
              <Link
                key={tour.slug}
                href={`/${tour.segment}/${tour.slug}` as never}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        SEGMENT_COLORS[tour.segment] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tn(tour.segment)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--segment-primary)]">
                    {tour.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm text-gray-600 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tour.duration}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{tc("from")}</span>
                      <span className="ml-1 text-base font-bold text-[var(--segment-primary,#1B4332)]">
                        ${tour.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
