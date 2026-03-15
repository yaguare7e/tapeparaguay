import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { BookingInquiryForm } from "@/components/sections/booking-inquiry-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "invest_residency" });
  return { title: t("meta_title"), description: t("meta_description") };
}

export default async function ResidencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("invest_residency");
  const tc = await getTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">{t("title")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{t("subtitle")}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-gray-700">{t("intro")}</p>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("requirements_title")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(["req_passport", "req_background", "req_birth", "req_income", "req_health", "req_photos"] as const).map((key) => (
              <div key={key} className="flex items-start gap-3 rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("timeline_title")}</h2>
          <div className="mt-12 relative">
            <div className="absolute left-7 top-0 h-full w-0.5 bg-emerald-200" />
            <div className="space-y-8">
              {([
                { key: "step_1", num: 1 },
                { key: "step_2", num: 2 },
                { key: "step_3", num: 3 },
                { key: "step_4", num: 4 },
              ] as const).map((step) => (
                <div key={step.key} className="relative flex items-start gap-5">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white shadow-lg">
                    {step.num}
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-100 flex-1">
                    <p className="text-gray-700">{t(step.key)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("benefits_title")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(["benefit_1", "benefit_2", "benefit_3", "benefit_4", "benefit_5", "benefit_6"] as const).map((key) => (
              <div key={key} className="flex items-start gap-3 rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("cost_title")}</h2>
          <div className="mt-10 overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-100">
            <table className="w-full">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">{t("cost_legal")}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">$1,500 - $3,000 USD</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">{t("cost_govt")}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">$300 - $500 USD</td>
                </tr>
                <tr className="bg-emerald-50 font-semibold">
                  <td className="px-6 py-4 text-sm text-emerald-900">{t("cost_total")}</td>
                  <td className="px-6 py-4 text-right text-sm text-emerald-900">$2,000 - $4,000 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm text-amber-800">{t("disclaimer")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-8 text-base font-semibold text-white shadow-md hover:bg-emerald-700"
          >
            {t("cta")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      <BookingInquiryForm segment="invest" />
    </>
  );
}
