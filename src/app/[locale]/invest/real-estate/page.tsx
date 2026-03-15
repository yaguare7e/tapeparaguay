import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "invest_realestate" });
  return { title: t("meta_title"), description: t("meta_description") };
}

export default async function RealEstatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("invest_realestate");
  const tc = await getTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">{t("title")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{t("subtitle")}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-gray-700">{t("intro")}</p>
        </div>
      </section>

      {/* Investment Zones */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("zones_title")}</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {([
              { key: "asuncion", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" },
              { key: "encarnacion", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" },
              { key: "luque", icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" },
              { key: "rural", icon: "M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738.145l-.995.663a.89.89 0 01-.662.163l-2.008-.335A1.108 1.108 0 0010 10.152V8.511a1.109 1.109 0 00-.337-.783L8.2 6.265a1.108 1.108 0 00-.783-.325H5.166a1.108 1.108 0 00-1.054.768l-.282.846A1.108 1.108 0 004.944 9h1.11c.252 0 .477.137.6.357l.395.724c.085.156.085.343 0 .5l-.535.98a1.108 1.108 0 00.058 1.11l.287.43a1.108 1.108 0 00.924.494h.996M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            ] as const).map((zone) => (
              <div key={zone.key} className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={zone.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t(`zone_${zone.key}`)}</h3>
                <p className="mt-2 text-sm text-gray-600">{t(`zone_${zone.key}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">{t("advantages_title")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(["adv_1", "adv_2", "adv_3", "adv_4", "adv_5", "adv_6"] as const).map((key) => (
              <div key={key} className="flex items-start gap-3 rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 text-base font-semibold text-white shadow-md hover:bg-blue-700"
          >
            {t("cta")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
