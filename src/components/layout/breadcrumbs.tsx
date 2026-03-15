"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    let label: string;

    try {
      label = t(segment);
    } catch {
      // If no translation exists, capitalize the slug
      label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return { href, label, isLast: index === segments.length - 1 };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm text-gray-500", className)}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="hover:text-[var(--segment-primary)] transition-colors"
          >
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <svg
              className="h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            {crumb.isLast ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href as never}
                className="hover:text-[var(--segment-primary)] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
