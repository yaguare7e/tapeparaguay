import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ImageGallery } from "@/components/ui/image-gallery";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: `${t("title")} | Tape Paraguay`,
    description: t("subtitle"),
  };
}

const PLACEHOLDER_IMAGES = [
  { src: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80", alt: "Asuncion skyline", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", alt: "Chaco wildlife", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", alt: "Jesuit Missions", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Encarnacion beach", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", alt: "Ybycui waterfall", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", alt: "Ciudad del Este", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", alt: "Motorcycle journey", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", alt: "Business district", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "Mountain landscape", width: 800, height: 600 },
];

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

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

      {/* Gallery */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ImageGallery images={PLACEHOLDER_IMAGES} />
        </div>
      </section>
    </>
  );
}
