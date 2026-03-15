"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { localeNames, localeRegions, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Change language"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span className="uppercase">{locale}</span>
        <svg
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-1 w-72 rounded-lg border border-gray-200 bg-white shadow-xl z-[100] max-h-96 overflow-y-auto">
          {Object.entries(localeRegions).map(([region, regionLocales]) => (
            <div key={region}>
              <div className="sticky top-0 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                {region}
              </div>
              <div className="grid grid-cols-2 gap-0.5 p-1">
                {regionLocales.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      "rounded-md px-3 py-2 text-left text-sm transition-colors",
                      loc === locale
                        ? "bg-[var(--segment-primary)]/10 text-[var(--segment-primary)] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
