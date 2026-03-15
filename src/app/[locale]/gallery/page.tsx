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
  { src: "https://images.unsplash.com/photo-1655775130609-642423db9ff9?w=800&q=80", alt: "Aerial view of Asuncion, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1717634546865-d5be86225c4a?w=800&q=80", alt: "Blue-and-yellow macaw in Asuncion, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1620736663824-18f7d3a79d54?w=800&q=80", alt: "Jesuit Mission ruins at sunset, Trinidad, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1575377606545-7a8d394925e8?w=800&q=80", alt: "River beach with swimmers, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1613338962230-46fde73d3d00?w=800&q=80", alt: "Salto Karapa waterfall, Reserva Mbaracayu, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1645008404857-92b275775ef8?w=800&q=80", alt: "Bridge over the Parana River near Ciudad del Este, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1708007736300-89c16fa57b40?w=800&q=80", alt: "Palacio de los Lopez, presidential palace in Asuncion, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1614949260630-1d8a27791215?w=800&q=80", alt: "Iguazu Falls panoramic view from the tri-border area", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1769794142260-c4115835231a?w=800&q=80", alt: "Paraguay River with dense jungle shoreline, Pantanal region", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1758550713905-3083dc337a4a?w=800&q=80", alt: "Adventure motorcycle rider on red earth road, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1646097009669-4779e34e5dd5?w=800&q=80", alt: "Sunset over agricultural fields, Amistad, Paraguay", width: 800, height: 600 },
  { src: "https://images.unsplash.com/photo-1743807059772-4b4a70148d62?w=800&q=80", alt: "Zunilda, vegetable vendor at Mercado 4, Asuncion, Paraguay", width: 800, height: 600 },
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
