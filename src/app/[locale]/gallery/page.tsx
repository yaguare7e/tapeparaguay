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
  { src: "https://images.unsplash.com/photo-1655775130609-642423db9ff9?w=800&q=80", alt: "Asuncion skyline", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1585318822320-300abf39f65d?w=800&q=80", alt: "Chaco wildlife", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1579957023433-7fad5b83efae?w=800&q=80", alt: "Jesuit Missions", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1649275579015-5092d2ffcf2b?w=800&q=80", alt: "Encarnacion beach", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1723784037687-edb3a4959c22?w=800&q=80", alt: "Ybycui waterfall", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1655425541685-c3d9b0672d9f?w=800&q=80", alt: "Ciudad del Este", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1758550713905-3083dc337a4a?w=800&q=80", alt: "Motorcycle journey", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1758519289559-f4d0ead39634?w=800&q=80", alt: "Business district", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1769794142260-c4115835231a?w=800&q=80", alt: "Mountain landscape", width: 800, height: 600 },
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
