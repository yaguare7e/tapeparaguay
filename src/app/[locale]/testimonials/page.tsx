import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonials" });
  return {
    title: `${t("title")} | Tape Paraguay`,
    description: t("subtitle"),
  };
}

export default async function TestimonialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <TestimonialsCarousel testimonials={[]} />
    </>
  );
}
