import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { DestinationGrid } from "@/components/sections/destination-grid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: `${t("destinations_title")} | Tape Paraguay`,
    description: t("destinations_subtitle"),
  };
}

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            {t("destinations_title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t("destinations_subtitle")}
          </p>
        </div>
      </section>

      {/* Destination Grid */}
      <DestinationGrid destinations={[]} />
    </>
  );
}
