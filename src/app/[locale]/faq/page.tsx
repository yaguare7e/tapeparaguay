import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/accordion";
import { FaqSchema } from "@/components/seo/faq-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: `${t("title")} | Tape Paraguay`,
    description: t("subtitle"),
  };
}

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  const faqItems = FAQ_KEYS.map((n) => ({
    title: t(`q_${n}`),
    content: t(`a_${n}`),
  }));

  const schemaItems = FAQ_KEYS.map((n) => ({
    question: t(`q_${n}`),
    answer: t(`a_${n}`),
  }));

  return (
    <>
      <FaqSchema items={schemaItems} />

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

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Accordion
            items={faqItems}
            allowMultiple
          />
        </div>
      </section>
    </>
  );
}
