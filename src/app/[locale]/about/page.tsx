import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `${t("hero_title")} | Tape Paraguay`,
    description: t("hero_subtitle"),
  };
}

const VALUES = [
  {
    key: "authenticity",
    icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
  },
  {
    key: "sustainability",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  },
  {
    key: "expertise",
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  },
] as const;

const TIMELINE = [
  { year: "2016", label: "Buenos Aires" },
  { year: "2017", label: "Patagonia to Bolivia" },
  { year: "2018", label: "Central America" },
  { year: "2019", label: "Paraguay" },
] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tc = await getTranslations("common");

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1758550713905-3083dc337a4a?w=1920&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            {t("our_story_label")}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {t("hero_title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {t("hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200 shadow-2xl">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1758550713905-3083dc337a4a?w=800&q=80)",
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-brand-accent p-6 shadow-xl sm:p-8">
                <div className="text-3xl font-bold text-white sm:text-4xl">4</div>
                <div className="text-sm font-medium text-white/80">
                  {t("years_on_road")}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                {t("journey_title")}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
                <p>{t("story_p1")}</p>
                <p>{t("story_p2")}</p>
              </div>

              {/* Journey highlights */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <div className="text-2xl font-bold text-brand-accent">30K+</div>
                  <div className="mt-1 text-xs text-gray-500">km</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <div className="text-2xl font-bold text-brand-accent">15</div>
                  <div className="mt-1 text-xs text-gray-500">{t("countries")}</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <div className="text-2xl font-bold text-brand-accent">1</div>
                  <div className="mt-1 text-xs text-gray-500">{t("home_found")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-0">
            {TIMELINE.map((item, index) => (
              <div key={item.year} className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-lg font-bold text-white shadow-lg">
                    {item.year}
                  </div>
                  {index < TIMELINE.length - 1 && (
                    <div className="h-12 w-0.5 bg-brand-accent/30" />
                  )}
                </div>
                <p className="text-lg font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("mission_title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            {t("mission_text")}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
            {t("values_title")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.key}
                className="rounded-xl bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-accent/20">
                  <svg
                    className="h-6 w-6 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={value.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {t(`value_${value.key}`)}
                </h3>
                <p className="mt-3 text-gray-400">
                  {t(`value_${value.key}_text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {tc("cta_contact")}
          </h2>
          <p className="mt-4 text-gray-600">
            {t("hero_subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-accent px-8 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90"
            >
              {tc("cta_contact")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/tours"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-8 text-base font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              {tc("cta_explore")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
