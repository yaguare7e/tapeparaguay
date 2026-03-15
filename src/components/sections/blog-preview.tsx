"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  heroImage: { url: string; alt: string } | null;
  author: string;
  publishedAt: string;
  readingTime?: number;
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    title: "Why Paraguay Is the Best-Kept Secret in South America",
    slug: "why-paraguay-best-kept-secret",
    excerpt:
      "While tourists flock to Peru, Argentina, and Brazil, savvy travelers are discovering Paraguay — a country of extraordinary nature, zero crowds, and unbeatable value.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=600&q=80",
      alt: "Paraguay landscape",
    },
    author: "Francisco Zubia",
    publishedAt: "2026-03-10",
    readingTime: 7,
  },
  {
    title: "The Complete Guide to Paraguay's 10% Tax System",
    slug: "complete-guide-paraguay-tax-system",
    excerpt:
      "Everything you need to know about Paraguay's territorial tax system, the 10% flat rate, and why global entrepreneurs are choosing Asuncion as their base.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
      alt: "Tax planning",
    },
    author: "Francisco Zubia",
    publishedAt: "2026-03-05",
    readingTime: 12,
  },
  {
    title: "700 Species: Paraguay's Incredible Bird Watching Scene",
    slug: "paraguay-bird-watching-guide",
    excerpt:
      "From the Pantanal wetlands to the dry Chaco, Paraguay is a birder's paradise. Discover the best spots, seasons, and species you can find nowhere else.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
      alt: "Birds in Paraguay",
    },
    author: "Francisco Zubia",
    publishedAt: "2026-02-28",
    readingTime: 9,
  },
];

export function BlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslations();
  const displayPosts = posts.length > 0 ? posts : PLACEHOLDER_POSTS;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("home.blog_title")}
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            {t("home.blog_subtitle")}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {displayPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}` as never}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {post.heroImage ? (
                  <Image
                    src={post.heroImage.url}
                    alt={post.heroImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  {post.readingTime && (
                    <>
                      <span>&middot;</span>
                      <span>{post.readingTime} min read</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-[var(--segment-primary)] line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--segment-primary,#1B4332)]">
                  {t("common.cta_read_more")}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--segment-primary,#1B4332)] font-semibold hover:underline"
          >
            {t("common.cta_view_all")} {t("nav.blog")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
