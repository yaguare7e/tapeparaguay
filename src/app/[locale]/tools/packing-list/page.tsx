import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools_packing" });
  return {
    title: `${t("title")} | Tape Paraguay`,
    description: t("subtitle"),
  };
}

const PACKING_CATEGORIES = [
  {
    key: "essentials",
    icon: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75",
    color: "bg-blue-50 text-blue-600",
    items: [
      "Passport (valid 6+ months)",
      "Travel insurance documents",
      "Cash: USD + Paraguayan Guaranies",
      "Credit/debit card (notify bank)",
      "Phone + charger + power adapter (Type C)",
      "Copies of all important documents",
    ],
  },
  {
    key: "clothing",
    icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
    color: "bg-rose-50 text-rose-600",
    items: [
      "Light cotton t-shirts and shirts",
      "Comfortable walking shorts/pants",
      "Lightweight rain jacket",
      "Swimwear",
      "Sandals + comfortable walking shoes",
      "Sun hat or cap",
      "Light layers for air-conditioned spaces",
      "One smart-casual outfit for restaurants",
    ],
  },
  {
    key: "health",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    color: "bg-emerald-50 text-emerald-600",
    items: [
      "Sunscreen SPF 50+",
      "Insect repellent (DEET-based)",
      "Reusable water bottle",
      "Basic first aid kit",
      "Personal medications + prescriptions",
      "Hand sanitizer",
      "Anti-diarrheal medicine",
    ],
  },
  {
    key: "documents",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    color: "bg-purple-50 text-purple-600",
    items: [
      "Passport + visa (if required)",
      "Flight tickets (printed + digital)",
      "Hotel/accommodation confirmations",
      "Travel insurance policy",
      "Emergency contact numbers",
      "Paraguay embassy contact info",
      "Driver's license (if renting)",
    ],
  },
  {
    key: "accessories",
    icon: "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z",
    color: "bg-amber-50 text-amber-600",
    items: [
      "Camera or smartphone with good camera",
      "Binoculars (for wildlife/birdwatching)",
      "Daypack/backpack",
      "Dry bag (for river activities)",
      "Flashlight/headlamp",
      "Notebook + pen",
    ],
  },
];

export default async function PackingListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tools_packing");

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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {PACKING_CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.color}`}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={cat.icon}
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t(cat.key)}
                  </h2>
                </div>
                <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-300">
                        <svg
                          className="h-3 w-3 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pro Tip */}
          <div className="mt-10 rounded-xl bg-amber-50 p-6 ring-1 ring-amber-200">
            <div className="flex gap-3">
              <svg
                className="h-6 w-6 shrink-0 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
              <div>
                <p className="font-semibold text-amber-800">{t("tip")}</p>
                <p className="mt-1 text-sm text-amber-700">{t("tip_text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
