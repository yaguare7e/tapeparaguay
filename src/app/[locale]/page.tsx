import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { SegmentCards } from "@/components/sections/segment-cards";
import { FeaturedTours } from "@/components/sections/featured-tours";
import { DestinationGrid } from "@/components/sections/destination-grid";
import { StatsCounter } from "@/components/sections/stats-counter";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { BlogPreview } from "@/components/sections/blog-preview";
import { FounderStory } from "@/components/sections/founder-story";
import { NewsletterCta } from "@/components/sections/newsletter-cta";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: `${t("hero_title")} | Tape Paraguay`,
    description: t("hero_subtitle"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // TODO: Replace with Sanity queries when CMS is connected
  // const [featuredTours, destinations, testimonials, blogPosts] = await Promise.all([
  //   client.fetch(FEATURED_TOURS_QUERY, { locale }),
  //   client.fetch(FEATURED_DESTINATIONS_QUERY, { locale }),
  //   client.fetch(TESTIMONIALS_QUERY, { locale }),
  //   client.fetch(LATEST_BLOG_QUERY, { locale }),
  // ]);

  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <SegmentCards />
      <FeaturedTours tours={[]} />
      <StatsCounter />
      <FounderStory />
      <DestinationGrid destinations={[]} />
      <TestimonialsCarousel testimonials={[]} />
      <BlogPreview posts={[]} />
      <NewsletterCta />
    </>
  );
}
