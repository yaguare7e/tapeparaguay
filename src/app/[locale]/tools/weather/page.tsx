import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools_weather" });
  return {
    title: `${t("title")} | Tape Paraguay`,
    description: t("subtitle"),
  };
}

const CITIES = [
  {
    name: "Asuncion",
    avgHigh: "33°C",
    avgLow: "18°C",
    climate: "Hot summers, mild winters. Rain year-round with peak in October-March.",
    icon: "sun",
  },
  {
    name: "Encarnacion",
    avgHigh: "31°C",
    avgLow: "15°C",
    climate: "Slightly cooler than Asuncion. Best beach weather October-March.",
    icon: "sun",
  },
  {
    name: "Ciudad del Este",
    avgHigh: "32°C",
    avgLow: "16°C",
    climate: "Humid subtropical. Higher rainfall than other cities.",
    icon: "cloud",
  },
  {
    name: "Filadelfia (Chaco)",
    avgHigh: "38°C",
    avgLow: "14°C",
    climate: "Semi-arid. Extreme heat in summer (45°C+). Best visited June-August.",
    icon: "sun",
  },
  {
    name: "San Bernardino",
    avgHigh: "30°C",
    avgLow: "16°C",
    climate: "Lake-effect breezes. Pleasant year-round. Peak season December-March.",
    icon: "sun",
  },
];

const MONTHS = [
  { name: "Jan", rating: "hot", temp: "35°C" },
  { name: "Feb", rating: "hot", temp: "34°C" },
  { name: "Mar", rating: "warm", temp: "32°C" },
  { name: "Apr", rating: "ideal", temp: "28°C" },
  { name: "May", rating: "ideal", temp: "24°C" },
  { name: "Jun", rating: "ideal", temp: "21°C" },
  { name: "Jul", rating: "ideal", temp: "21°C" },
  { name: "Aug", rating: "ideal", temp: "23°C" },
  { name: "Sep", rating: "warm", temp: "26°C" },
  { name: "Oct", rating: "warm", temp: "29°C" },
  { name: "Nov", rating: "hot", temp: "32°C" },
  { name: "Dec", rating: "hot", temp: "34°C" },
];

const RATING_COLORS: Record<string, string> = {
  ideal: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warm: "bg-amber-100 text-amber-800 border-amber-200",
  hot: "bg-red-100 text-red-800 border-red-200",
};

export default async function WeatherPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tools_weather");

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

      {/* City Weather Cards */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <div
                key={city.name}
                className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {city.name}
                  </h3>
                  {city.icon === "sun" ? (
                    <svg
                      className="h-8 w-8 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-8 w-8 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                      />
                    </svg>
                  )}
                </div>
                <div className="mt-4 flex gap-4">
                  <div>
                    <p className="text-xs text-gray-500">High</p>
                    <p className="text-xl font-bold text-red-600">
                      {city.avgHigh}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Low</p>
                    <p className="text-xl font-bold text-blue-600">
                      {city.avgLow}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{city.climate}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Months */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            {t("best_months_title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
            {t("best_months_desc")}
          </p>
          <div className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
            {MONTHS.map((m) => (
              <div
                key={m.name}
                className={`rounded-lg border p-2 text-center ${RATING_COLORS[m.rating]}`}
              >
                <p className="text-xs font-semibold">{m.name}</p>
                <p className="mt-1 text-sm font-bold">{m.temp}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-200" /> Ideal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-amber-200" /> Warm
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-200" /> Hot
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
