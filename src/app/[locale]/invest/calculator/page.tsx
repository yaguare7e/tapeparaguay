import { setRequestLocale, getTranslations } from "next-intl/server";
import { InvestCalcWidget } from "./invest-calc-widget";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "invest_calculator" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("invest_calculator");

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <InvestCalcWidget />

          {/* Disclaimer */}
          <div className="mt-8 rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
            {t("disclaimer")}
          </div>
        </div>
      </section>
    </>
  );
}
