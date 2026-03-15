import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tapeparaguay.com";

// Static pages that exist for every locale
const STATIC_PAGES = [
  "",
  "/adventure",
  "/culture",
  "/invest",
  "/invest/residency",
  "/invest/tax-benefits",
  "/invest/real-estate",
  "/invest/calculator",
  "/leisure",
  "/destinations",
  "/tours",
  "/about",
  "/blog",
  "/contact",
  "/faq",
  "/gallery",
  "/testimonials",
  "/tools",
  "/tools/currency-converter",
  "/tools/weather",
  "/tools/packing-list",
  "/tools/tax-calculator",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cancellation",
];

// Dynamic tour slugs (will be replaced by Sanity CMS queries)
const TOUR_SLUGS = [
  "chaco-wildlife-safari",
  "jesuit-missions-heritage-trail",
  "paraguay-residency-fast-track",
  "encarnacion-beach-weekend",
  "pantanal-birdwatching",
  "asuncion-food-tour",
  "guarani-culture-immersion",
  "real-estate-investment-tour",
];

const DESTINATION_SLUGS = [
  "asuncion",
  "encarnacion",
  "chaco",
  "ciudad-del-este",
  "san-bernardino",
  "ybycui",
];

const BLOG_SLUGS = [
  "why-paraguay-best-kept-secret",
  "chaco-expedition-guide",
  "10-percent-flat-tax-explained",
  "jesuit-missions-unesco-guide",
  "encarnacion-carnival-guide",
  "getting-paraguayan-residency",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for all locales
  for (const page of STATIC_PAGES) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${BASE_URL}/${locale}${page}`;
    }

    entries.push({
      url: `${BASE_URL}/es${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "daily" : "weekly",
      priority: page === "" ? 1.0 : page.startsWith("/adventure") || page.startsWith("/invest") ? 0.9 : 0.7,
      alternates: {
        languages: alternates,
      },
    });
  }

  // Dynamic tour pages
  for (const slug of TOUR_SLUGS) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${BASE_URL}/${locale}/tours/${slug}`;
    }
    entries.push({
      url: `${BASE_URL}/es/tours/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: alternates },
    });
  }

  // Dynamic destination pages
  for (const slug of DESTINATION_SLUGS) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${BASE_URL}/${locale}/destinations/${slug}`;
    }
    entries.push({
      url: `${BASE_URL}/es/destinations/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: alternates },
    });
  }

  // Dynamic blog pages
  for (const slug of BLOG_SLUGS) {
    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${BASE_URL}/${locale}/blog/${slug}`;
    }
    entries.push({
      url: `${BASE_URL}/es/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: alternates },
    });
  }

  // TODO: Replace hardcoded slugs with Sanity CMS queries
  // const tours = await client.fetch('*[_type == "tour"]{ "slug": slug.current }');
  // const destinations = await client.fetch('*[_type == "destination"]{ "slug": slug.current }');
  // const blogPosts = await client.fetch('*[_type == "blogPost"]{ "slug": slug.current }');

  return entries;
}
