import { setRequestLocale, getTranslations } from "next-intl/server";
import { CurrencyWidget } from "./currency-widget";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools_currency" });
  return {
    title: `${t("title")} | Tape Paraguay`,
    description: t("subtitle"),
  };
}

export default async function CurrencyConverterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tools_currency");

  return (
    <>
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <CurrencyWidget />

          {/* Popular Rates */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900">
              {t("popular_rates")}
            </h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Currency
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      1 USD =
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { code: "PYG", name: "Guarani Paraguayo", rate: "7,300" },
                    { code: "EUR", name: "Euro", rate: "0.92" },
                    { code: "GBP", name: "British Pound", rate: "0.79" },
                    { code: "BRL", name: "Brazilian Real", rate: "5.03" },
                    { code: "ARS", name: "Argentine Peso", rate: "890" },
                  ].map((c) => (
                    <tr key={c.code}>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <span className="font-medium">{c.code}</span>{" "}
                        <span className="text-gray-500">— {c.name}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                        {c.rate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500">{t("note")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
