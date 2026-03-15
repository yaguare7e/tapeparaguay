import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { FeaturedTours } from "@/components/sections/featured-tours";
import { BookingInquiryForm } from "@/components/sections/booking-inquiry-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "culture" });
  return { title: t("meta_title"), description: t("meta_description") };
}

export default async function CulturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("culture");

  return (
    <>
      <Hero segment="culture" />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-gray-700">{t("intro")}</p>
        </div>
      </section>
      <FeaturedTours tours={[]} />
      <BookingInquiryForm segment="culture" />
    </>
  );
}
