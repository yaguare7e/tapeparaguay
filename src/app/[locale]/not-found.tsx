import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("404");

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-brand-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-gray-600">
          {t("description")}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--segment-primary,#1B4332)] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t("back_home")}
        </Link>
      </div>
    </section>
  );
}
