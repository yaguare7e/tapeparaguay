"use client";

import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

function ImageGallery({ images, className }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = lightboxIndex !== null;
  const current = isOpen ? images[lightboxIndex] : null;

  /* ---------- open/close lightbox ---------- */
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  /* ---------- sync with native dialog ---------- */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  /* ---------- keyboard navigation ---------- */
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "Escape":
          e.preventDefault();
          closeLightbox();
          break;
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, goNext, goPrev, closeLightbox]);

  return (
    <>
      {/* Grid */}
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--segment-primary)] focus-visible:ring-offset-2"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {/* Lightbox dialog */}
      <dialog
        ref={dialogRef}
        onClose={closeLightbox}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeLightbox();
        }}
        className="m-auto max-h-[95vh] max-w-[95vw] border-none bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        {current && (
          <div className="relative flex items-center justify-center">
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute -left-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
            )}

            {/* Image */}
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="max-h-[85vh] rounded-lg object-contain"
              priority
            />

            {/* Next arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute -right-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
            )}

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-white/80">
                {(lightboxIndex ?? 0) + 1} / {images.length}
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

export { ImageGallery };
