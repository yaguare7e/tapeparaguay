"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils/cn";
import { SEGMENTS, type Segment } from "@/lib/constants/segments";

const NAV_ITEMS = [
  { key: "adventure", href: "/adventure" as const, segment: "adventure" as Segment },
  { key: "culture", href: "/culture" as const, segment: "culture" as Segment },
  { key: "invest", href: "/invest" as const, segment: "invest" as Segment },
  { key: "leisure", href: "/leisure" as const, segment: "leisure" as Segment },
  { key: "destinations", href: "/destinations" as const },
  { key: "blog", href: "/blog" as const },
  { key: "about", href: "/about" as const },
  { key: "contact", href: "/contact" as const },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentSegment = SEGMENTS.find((s) =>
    pathname.startsWith(`/${s}`)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white font-bold text-lg">
            T
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-brand-primary">
              Tape
            </span>
            <span className="text-lg font-bold text-brand-accent">
              {" "}Paraguay
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const isSegment = "segment" in item;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-[var(--segment-primary)]/10 text-[var(--segment-primary)]"
                    : "text-gray-700 hover:text-[var(--segment-primary)] hover:bg-gray-50",
                  isSegment && !isActive && "font-semibold"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right side: Language + Mobile menu */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex lg:hidden items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={NAV_ITEMS}
        currentPath={pathname}
      />
    </header>
  );
}
