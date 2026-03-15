"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import type { Segment } from "@/lib/constants/segments";

interface NavItem {
  key: string;
  href: string;
  segment?: Segment;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: readonly NavItem[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  items,
  currentPath,
}: MobileMenuProps) {
  const t = useTranslations("nav");

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
            <div>
              <span className="text-lg font-bold text-brand-primary">
                Tape
              </span>
              <span className="text-lg font-bold text-brand-accent">
                {" "}Paraguay
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = currentPath.startsWith(item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href as "/adventure" | "/culture" | "/invest" | "/leisure" | "/destinations" | "/blog" | "/about" | "/contact"}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-[var(--segment-primary)]/10 text-[var(--segment-primary)]"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom CTA */}
          <div className="border-t border-gray-100 p-4">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
