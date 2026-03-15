import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "invest_tax" });
  return { title: t("meta_title"), description: t("meta_description") };
}

export default async function TaxBenefitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("invest_tax");
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

      {/* Tax Stats */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
              <div className="text-5xl font-extrabold text-emerald-600">{t("income_tax_rate")}</div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">{t("income_tax_title")}</h3>
              <p className="mt-2 text-center text-sm text-gray-600">{t("income_tax_desc")}</p>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
              <div className="text-5xl font-extrabold text-blue-600">{t("vat_rate")}</div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">{t("vat_title")}</h3>
              <p className="mt-2 text-center text-sm text-gray-600">{t("vat_desc")}</p>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
              <div className="text-5xl font-extrabold text-amber-600">{t("territorial_rate")}</div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">{t("territorial_title")}</h3>
              <p className="mt-2 text-center text-sm text-gray-600">{t("territorial_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("comparison_title")}</h2>
          <div className="mt-10 overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-100">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t("country")}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{t("tax_rate")}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{t("foreign_income")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-emerald-50">
                  <td className="px-6 py-4 text-sm font-bold text-emerald-700">Paraguay</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">10%</span></td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-emerald-700">{t("not_taxed")}</td>
                </tr>
                {[
                  { name: "United States", rate: "37%", system: "taxed" },
                  { name: "United Kingdom", rate: "45%", system: "taxed" },
                  { name: "Spain", rate: "47%", system: "taxed" },
                  { name: "Germany", rate: "45%", system: "taxed" },
                  { name: "Argentina", rate: "35%", system: "taxed" },
                ].map((c) => (
                  <tr key={c.name}>
                    <td className="px-6 py-4 text-sm text-gray-900">{c.name}</td>
                    <td className="px-6 py-4 text-center"><span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">{c.rate}</span></td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">{t("taxed")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("ideal_for_title")}</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {([
              { key: "remote", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
              { key: "investors", icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" },
              { key: "entrepreneurs", icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" },
              { key: "retirees", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" },
            ] as const).map((item) => (
              <div key={item.key} className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-md">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t(`ideal_${item.key}`)}</h3>
                <p className="mt-2 text-sm text-gray-600">{t(`ideal_${item.key}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
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
    </>
  );
}
