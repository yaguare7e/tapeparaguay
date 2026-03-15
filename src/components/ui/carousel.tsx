"use client";

import { cn } from "@/lib/utils/cn";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface CarouselProps {
  children: ReactNode;
  /** Enable auto-scroll */
  autoplay?: boolean;
  /** Auto-scroll interval in milliseconds */
  interval?: number;
  className?: string;
  /** Accessible label for the carousel region */
  ariaLabel?: string;
}

function Carousel({
  children,
  autoplay = false,
  interval = 5000,
  className,
  ariaLabel = "Carousel",
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = Children.toArray(children);
  const slideCount = slides.length;
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---------- scroll to slide --------- */
  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const clamped = Math.max(0, Math.min(index, slideCount - 1));
      const slideWidth = container.offsetWidth;
      container.scrollTo({ left: slideWidth * clamped, behavior: "smooth" });
      setActiveIndex(clamped);
    },
    [slideCount]
  );

  /* ---- observe scroll position to sync active dot ---- */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const slideWidth = container.offsetWidth;
        if (slideWidth > 0) {
          const idx = Math.round(container.scrollLeft / slideWidth);
          setActiveIndex(idx);
        }
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------- autoplay ------------- */
  useEffect(() => {
    if (!autoplay || slideCount <= 1) return;

    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % slideCount;
        scrollToIndex(next);
        return next;
      });
    }, interval);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, interval, slideCount, scrollToIndex]);

  /* -- pause autoplay on hover/focus -- */
  const pauseAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    scrollToIndex(activeIndex < slideCount - 1 ? activeIndex + 1 : 0);
  }, [activeIndex, slideCount, scrollToIndex]);

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndex > 0 ? activeIndex - 1 : slideCount - 1);
  }, [activeIndex, slideCount, scrollToIndex]);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={pauseAutoplay}
      onFocus={pauseAutoplay}
    >
      {/* Slides container */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${slideCount}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--segment-primary)] shadow-md backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--segment-primary)]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--segment-primary)] shadow-md backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--segment-primary)]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slideCount > 1 && (
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--segment-primary)] focus-visible:ring-offset-2",
                i === activeIndex
                  ? "w-7 bg-[var(--segment-primary)]"
                  : "w-2.5 bg-white/60 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { Carousel };
