import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { locales } from "@/lib/i18n/locales";
import { ArticleSchema } from "@/components/seo/article-schema";

const POSTS = [
  {
    slug: "why-paraguay-best-kept-secret",
    title: "Why Paraguay Is South America's Best-Kept Secret",
    excerpt:
      "From its unique bilingual culture to its incredibly favorable tax system, discover why more and more travelers and investors are choosing Paraguay.",
    content: `Paraguay remains one of the most underrated destinations in South America. While its neighbors Argentina and Brazil capture the lion's share of tourist attention, Paraguay quietly offers something that neither can match: authenticity without the crowds.

The country is uniquely bilingual — the only nation in the Americas where an indigenous language, Guarani, holds equal official status with Spanish. This bilingualism is not just a legal formality; it permeates daily life, from market banter to love songs.

For investors, the appeal is equally compelling. Paraguay's 10% flat income tax and territorial tax system mean that foreign-sourced income is completely untaxed. Combined with a residency process that can be completed in 45 days, it's no wonder that Paraguay has become the quiet favorite of digital nomads, remote workers, and international investors.

The natural beauty is staggering. The Gran Chaco covers 60% of the country — a wilderness larger than Germany, home to jaguars, giant armadillos, and over 400 bird species. The Pantanal wetlands in the north are among the most biodiverse places on Earth. And the Parana River in the south has carved out beaches that rival anything in the region.

But perhaps the greatest draw is the Paraguayan people themselves — warm, generous, and genuinely curious about visitors. In a world of overtourism and Instagram-driven travel, Paraguay offers something increasingly rare: the chance to discover a country that has not yet been discovered.`,
    date: "2025-12-15",
    image:
      "https://images.unsplash.com/photo-1655775130609-642423db9ff9?w=1200&q=80",
    category: "travel",
    author: "Francisco Zubia",
    readTime: 8,
  },
  {
    slug: "chaco-expedition-guide",
    title: "The Ultimate Chaco Expedition Guide",
    excerpt:
      "Everything you need to know before venturing into the Paraguayan Chaco: wildlife, best seasons, what to pack, and must-see stops along the Trans-Chaco Highway.",
    content: `The Gran Chaco is one of South America's last true wildernesses — a vast, sparsely populated region that stretches across western Paraguay, into Bolivia and Argentina. The Paraguayan Chaco alone covers roughly 60% of the country's territory but holds less than 3% of its population.

Getting there: The Trans-Chaco Highway (Ruta 9) is the main artery, stretching 800 km from Asuncion to the Bolivian border. While paved, services become scarce beyond Filadelfia.

Best time to visit: June to August offers the most comfortable temperatures and best wildlife sightings. Avoid December-February unless you're prepared for extreme heat exceeding 45°C.

What to expect: The Chaco transitions from palm savannas near the Paraguay River to dry scrubland and quebracho forests in the west. Wildlife includes jaguars, pumas, giant armadillos, tapirs, peccaries, and over 400 bird species.

Essential gear: Bring at least 10 liters of water per person per day, high-SPF sunscreen, insect repellent with DEET, long-sleeved lightweight clothing, a quality flashlight, and a basic first aid kit. Cell coverage is limited beyond Filadelfia.

The Mennonite colonies of Filadelfia, Loma Plata, and Neuland offer surprising oases of German-speaking dairy farming culture in the middle of the wilderness — complete with excellent cheese and cold beer. The Mennonite Museum in Filadelfia provides fascinating insight into how these communities thrived in such a challenging environment.

For wildlife enthusiasts, the area around Fortín Toledo and the Defensores del Chaco National Park offers some of the best jaguar sighting opportunities in all of South America.`,
    date: "2025-11-28",
    image:
      "https://images.unsplash.com/photo-1717634546865-d5be86225c4a?w=1200&q=80",
    category: "adventure",
    author: "Francisco Zubia",
    readTime: 12,
  },
  {
    slug: "10-percent-flat-tax-explained",
    title: "Paraguay's 10% Flat Tax: What You Need to Know",
    excerpt:
      "A comprehensive breakdown of Paraguay's territorial tax system, how it compares to other countries, and what it means for digital nomads and investors.",
    content: `Paraguay's tax system is remarkably simple compared to most countries. Here's what you need to understand.

Income Tax (IRP/IRACIS): A flat 10% on net taxable income. No progressive brackets — whether you earn $10,000 or $10 million, the rate stays at 10%.

Territorial System: This is the key advantage. Paraguay only taxes income generated within its borders. If you work remotely for clients outside Paraguay, those earnings are NOT subject to Paraguayan income tax.

This applies to: freelance and consulting income from foreign clients, dividends from foreign companies, rental income from properties abroad, capital gains on foreign assets, and pensions from other countries.

VAT (IVA): 10% standard rate, 5% on basic products and pharmaceuticals.

Property Tax: Roughly 1% of the fiscal value (which is typically much lower than market value).

There is no inheritance tax, no wealth tax, and no capital gains tax on personal assets.

How it compares: While countries like the USA tax worldwide income at rates up to 37%, and European nations routinely charge 40-50%, Paraguay's combination of low rates and territorial taxation creates significant savings for anyone earning income internationally.

Important: To benefit from the territorial system, you need to be a tax resident (which comes automatically with your permanent residency). Always consult a licensed Paraguayan accountant (contador) for your specific situation.

The practical impact is substantial. A remote worker earning $100,000 USD from foreign clients would pay approximately $0 in Paraguayan income tax, compared to $24,000+ in the United States or $30,000+ in many European countries.`,
    date: "2025-11-10",
    image:
      "https://images.unsplash.com/photo-1758519289559-f4d0ead39634?w=1200&q=80",
    category: "invest",
    author: "Francisco Zubia",
    readTime: 10,
  },
  {
    slug: "jesuit-missions-unesco-guide",
    title: "Visiting Paraguay's UNESCO Jesuit Missions",
    excerpt:
      "A detailed guide to exploring the Jesuit-Guarani missions of Trinidad and Jesus de Tavarangue, including history, tips, and nearby attractions.",
    content: `The Jesuit-Guarani Missions of Trinidad and Jesus de Tavarangue stand as haunting testaments to one of history's most remarkable social experiments. Declared UNESCO World Heritage Sites in 1993, these ruins tell the story of the Jesuit Reductions — communities where Jesuit priests and Guarani people created a unique society.

Trinidad (La Santisima Trinidad del Parana) is the more complete of the two, featuring impressive stone churches, living quarters, and workshops. The main church was designed by Italian architect Juan Bautista Primoli and could hold up to 4,000 people. The carved sandstone details remain remarkably intact.

Jesus de Tavarangue, 12 km from Trinidad, is smaller but arguably more atmospheric. Its unfinished church with Moorish-influenced arches is unlike anything else in South America. The three-arched doorway is an architectural wonder that blends European design with indigenous sensibility.

The sound and light show at Trinidad runs on Tuesday and Saturday evenings and is a must-see experience. Projections on the stone walls bring the mission's history to life with dramatic effect. Arrive early to explore the ruins in the golden hour light before the show begins.

Getting there: Located near Encarnacion in southern Paraguay, about 370 km from Asuncion. You can drive (about 4.5 hours on Ruta 1) or take a bus to Encarnacion and hire a local guide. A day trip from Encarnacion is ideal.

Combine your visit with a stop at the Argentine missions of San Ignacio Mini (across the border) for the complete Jesuit Missions experience of the region.`,
    date: "2025-10-22",
    image:
      "https://images.unsplash.com/photo-1620736663824-18f7d3a79d54?w=1200&q=80",
    category: "culture",
    author: "Francisco Zubia",
    readTime: 9,
  },
  {
    slug: "encarnacion-carnival-guide",
    title: "Encarnacion Carnival: Paraguay's Greatest Party",
    excerpt:
      "Everything you need to know about the Encarnacion Carnival, from the best dates to where to stay and what to expect.",
    content: `Every January and February, Encarnacion transforms into the carnival capital of Paraguay. Often called 'the Pearl of the South,' this riverside city hosts a carnival that rivals those of Rio and Buenos Aires in spectacle, if not in size.

The Encarnacion Carnival features elaborate float parades, samba schools, and the famous carnival queens — all set against the backdrop of the city's modern costanera along the Parana River.

What sets it apart: Unlike many carnivals, Encarnacion's event is family-friendly during early hours and transforms into a proper party as night falls. The sambodromo provides stadium seating, while the surrounding streets fill with food vendors, live music, and spontaneous dancing.

Dates: Usually four consecutive Saturday nights in January-February. Check specific dates as they change yearly.

Where to stay: Book early — hotels fill up months in advance. Consider staying in the Circuito Comercial area for easy access to the festivities. Airbnb options in the surrounding neighborhoods offer good value.

What to wear: Light clothing is essential — temperatures regularly exceed 35°C. Comfortable shoes for walking and dancing. Many attendees wear white to stay cool and match the festive atmosphere.

The final Saturday (the 'clausura') is the biggest night, but the first Saturday offers a more relaxed atmosphere where you can actually see the details of the floats and costumes.

Food and drink: Street vendors offer empanadas, choripan, terere, and cold beer throughout the event. The costanera restaurants stay open late with special carnival menus.`,
    date: "2025-10-05",
    image:
      "https://images.unsplash.com/photo-1575377606545-7a8d394925e8?w=1200&q=80",
    category: "leisure",
    author: "Francisco Zubia",
    readTime: 7,
  },
  {
    slug: "getting-paraguayan-residency",
    title: "How to Get Paraguayan Residency in 45 Days",
    excerpt:
      "A step-by-step guide to obtaining permanent residency in Paraguay, including required documents, costs, and timeline.",
    content: `Obtaining permanent residency in Paraguay is one of the most straightforward immigration processes in the world. Here is a complete guide based on real experience.

Step 1 — Prepare Documents (Before You Arrive): Criminal background check from your home country (apostilled), birth certificate (apostilled), and proof of income or bank balance showing at least $5,500 USD. All documents must be translated to Spanish by a certified translator.

Step 2 — Arrive in Paraguay (Day 1-5): Open a bank account at a foreigner-friendly institution like Banco Continental, Banco Atlas, or Itau. Get your medical certificate from an authorized clinic. Get passport photos taken at any photo studio.

Step 3 — Submit to Migraciones (Day 5-15): Visit the Direccion General de Migraciones with all your documents. Pay the processing fee of approximately $300-400 USD. Provide your local address in Paraguay.

Step 4 — Wait for Processing (Day 15-30): Your application is reviewed and background checks are run. Some applicants receive approval in as little as 2 weeks. You can track the status through the Migraciones website.

Step 5 — Get Your Cedula (Day 30-45): Once approved, you will receive your Paraguayan cedula (national ID card), which serves as your residency proof and allows you to open more bank accounts, buy property, drive with a Paraguayan license, and access the healthcare system.

Important notes: There is NO minimum stay requirement to maintain your residency. You do NOT need to renounce your current citizenship. Paraguay allows dual citizenship. After 3 years of residency, you can apply for citizenship.

Total costs: Legal fees $1,500-3,000 USD (depending on the law firm), government fees $300-500 USD, translations and notarizations $200-400 USD.

We always recommend working with a reputable immigration attorney in Paraguay. Contact us for referrals to vetted professionals.`,
    date: "2025-09-18",
    image:
      "https://images.unsplash.com/photo-1646097009669-4779e34e5dd5?w=600&q=80",
    category: "invest",
    author: "Francisco Zubia",
    readTime: 11,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  travel: "bg-gray-100 text-gray-800",
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
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | Tape Paraguay" };
  return {
    title: `${post.title} | Tape Paraguay`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    POSTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const t = await getTranslations("blog_detail");
  const tc = await getTranslations("common");

  const relatedPosts = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const paragraphs = post.content.split("\n\n");

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={`/${locale}/blog/${post.slug}`}
        image={post.image}
        author={post.author}
        publishedAt={post.date}
        section={post.category}
      />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 pt-32 sm:px-6 lg:px-8">
          <Link
            href="/blog"
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
            {t("back_to_blog")}
          </Link>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-800"}`}
          >
            {post.category}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span>
              {t("author")}: {post.author}
            </span>
            <span>•</span>
            <span>
              {t("published")}: {post.date}
            </span>
            <span>•</span>
            <span>
              {post.readTime} {t("read_time")}
            </span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-[var(--segment-primary,#1B4332)]">
            {paragraphs.map((para, i) => (
              <p key={i} className="mb-6 leading-relaxed text-gray-700">
                {para}
              </p>
            ))}
          </div>

          {/* Share */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("share")}
            </h3>
            <div className="mt-3 flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://tapeparaguay.com/${locale}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                {t("share_twitter")}
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://tapeparaguay.com/${locale}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                {t("share_facebook")}
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} https://tapeparaguay.com/${locale}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                {t("share_whatsapp")}
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("related_posts")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}` as never}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs text-gray-500">{rp.date}</time>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-[var(--segment-primary)]">
                    {rp.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-2">
                    {rp.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
