import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: `${t("blog_title")} | Tape Paraguay`,
    description: t("blog_subtitle"),
  };
}

const PLACEHOLDER_POSTS = [
  {
    slug: "why-paraguay-best-kept-secret",
    title: "Why Paraguay Is South America's Best-Kept Secret",
    excerpt: "From its unique bilingual culture to its incredibly favorable tax system, discover why more and more travelers and investors are choosing Paraguay.",
    date: "2025-12-15",
    image: "https://images.unsplash.com/photo-1655775130609-642423db9ff9?w=600&q=80",
    category: "travel",
  },
  {
    slug: "chaco-expedition-guide",
    title: "The Ultimate Chaco Expedition Guide",
    excerpt: "Everything you need to know before venturing into the Paraguayan Chaco: wildlife, best seasons, what to pack, and must-see stops along the Trans-Chaco Highway.",
    date: "2025-11-28",
    image: "https://images.unsplash.com/photo-1585318822320-300abf39f65d?w=600&q=80",
    category: "adventure",
  },
  {
    slug: "10-percent-flat-tax-explained",
    title: "Paraguay's 10% Flat Tax: What You Need to Know",
    excerpt: "A comprehensive breakdown of Paraguay's territorial tax system, how it compares to other countries, and what it means for digital nomads and investors.",
    date: "2025-11-10",
    image: "https://images.unsplash.com/photo-1758519289559-f4d0ead39634?w=600&q=80",
    category: "invest",
  },
  {
    slug: "jesuit-missions-unesco-guide",
    title: "Visiting Paraguay's UNESCO Jesuit Missions",
    excerpt: "A detailed guide to exploring the Jesuit-Guarani missions of Trinidad and Jesus de Tavarangue, including history, tips, and nearby attractions.",
    date: "2025-10-22",
    image: "https://images.unsplash.com/photo-1579957023433-7fad5b83efae?w=600&q=80",
    category: "culture",
  },
  {
    slug: "encarnacion-carnival-guide",
    title: "Encarnacion Carnival: Paraguay's Greatest Party",
    excerpt: "Everything you need to know about the Encarnacion Carnival, from the best dates to attend to where to stay and what to expect.",
    date: "2025-10-05",
    image: "https://images.unsplash.com/photo-1649275579015-5092d2ffcf2b?w=600&q=80",
    category: "leisure",
  },
  {
    slug: "getting-paraguayan-residency",
    title: "How to Get Paraguayan Residency in 45 Days",
    excerpt: "A step-by-step guide to obtaining permanent residency in Paraguay, including required documents, costs, and timeline.",
    date: "2025-09-18",
    image: "https://images.unsplash.com/photo-1646097009669-4779e34e5dd5?w=600&q=80",
    category: "invest",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  travel: "bg-gray-100 text-gray-800",
  adventure: "bg-emerald-100 text-emerald-800",
  culture: "bg-rose-100 text-rose-800",
  invest: "bg-blue-100 text-blue-800",
  leisure: "bg-amber-100 text-amber-800",
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            {t("blog_title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t("blog_subtitle")}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}` as never}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs text-gray-500">{post.date}</time>
                  <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-[var(--segment-primary)]">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--segment-primary,#1B4332)]">
                    {tc("cta_read_more")}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
