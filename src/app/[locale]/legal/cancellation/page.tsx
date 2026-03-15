import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("cancellation_title")} | Tape Paraguay`,
  };
}

export default async function CancellationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <>
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            {t("cancellation_title")}
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="prose prose-gray mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2>{t("cancel_s1_title")}</h2>
          <p>{t("cancel_s1_text")}</p>
          <ul>
            <li><strong>{t("cancel_s1_item1")}</strong></li>
            <li><strong>{t("cancel_s1_item2")}</strong></li>
            <li><strong>{t("cancel_s1_item3")}</strong></li>
            <li><strong>{t("cancel_s1_item4")}</strong></li>
          </ul>

          {([2, 3, 4, 5, 6, 7] as const).map((n) => (
            <div key={n}>
              <h2>{t(`cancel_s${n}_title`)}</h2>
              <p>{t(`cancel_s${n}_text`)}</p>
            </div>
          ))}

          <p className="text-sm text-gray-500">
            {t("last_updated")}
          </p>
        </div>
      </section>
    </>
  );
}
