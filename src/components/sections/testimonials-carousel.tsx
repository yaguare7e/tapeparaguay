"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  segment: string;
  avatar?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    location: "Austin, Texas",
    quote:
      "The Chaco expedition was life-changing. Francisco and his team know Paraguay like no one else. We saw wildlife you won't find on any mainstream tour.",
    rating: 5,
    segment: "adventure",
  },
  {
    name: "Thomas Weber",
    location: "Munich, Germany",
    quote:
      "Moving to Paraguay was the best financial decision I've made. Tape Paraguay guided me through every step — residency, banking, real estate. Flawless.",
    rating: 5,
    segment: "invest",
  },
  {
    name: "Maria Gonzalez",
    location: "Buenos Aires, Argentina",
    quote:
      "Las Misiones Jesuiticas con el tour de Tape Paraguay fue una experiencia increible. La guia era super conocedora y apasionada.",
    rating: 5,
    segment: "culture",
  },
  {
    name: "Lucas Ferreira",
    location: "Sao Paulo, Brazil",
    quote:
      "Encarnacion for Carnaval was amazing! Great hotel, great food recommendations, and the whole trip was organized perfectly. Will definitely be back.",
    rating: 5,
    segment: "leisure",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "text-amber-400" : "text-gray-200"
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const t = useTranslations();
  const [active, setActive] = useState(0);
  const displayTestimonials =
    testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("testimonials.title")}
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {displayTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--segment-primary,#1B4332)] text-white font-semibold text-sm">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
