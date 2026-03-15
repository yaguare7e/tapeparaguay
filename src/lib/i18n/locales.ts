export const locales = [
  "es", "en", "pt", "de", "fr", "it", "nl", "ru", "ja", "ko",
  "zh", "ar", "hi", "tr", "pl", "sv", "da", "no", "fi", "cs",
  "hu", "ro", "bg", "hr", "sk", "sl", "uk", "he", "th", "vi",
  "id", "ms", "gn",
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Espanol", en: "English", pt: "Portugues", de: "Deutsch",
  fr: "Francais", it: "Italiano", nl: "Nederlands", ru: "Russian",
  ja: "Japanese", ko: "Korean", zh: "Chinese", ar: "Arabic",
  hi: "Hindi", tr: "Turkish", pl: "Polski", sv: "Svenska",
  da: "Dansk", no: "Norsk", fi: "Suomi", cs: "Cestina",
  hu: "Magyar", ro: "Romana", bg: "Bulgarian", hr: "Hrvatski",
  sk: "Slovencina", sl: "Slovenscina", uk: "Ukrainian", he: "Hebrew",
  th: "Thai", vi: "Vietnamese", id: "Bahasa Indonesia",
  ms: "Bahasa Melayu", gn: "Guarani",
};

export const localeRegions: Record<string, Locale[]> = {
  "Americas": ["es", "en", "pt", "gn"],
  "Europe": ["de", "fr", "it", "nl", "pl", "sv", "da", "no", "fi", "cs", "hu", "ro", "bg", "hr", "sk", "sl", "uk"],
  "Asia & Pacific": ["ja", "ko", "zh", "hi", "th", "vi", "id", "ms"],
  "Middle East & Africa": ["ar", "he", "tr", "ru"],
};
