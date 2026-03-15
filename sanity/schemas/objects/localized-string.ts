import { defineType } from "sanity";

const LOCALES = [
  "es", "en", "pt", "de", "fr", "it", "nl", "ru", "ja", "ko",
  "zh", "ar", "hi", "tr", "pl", "sv", "da", "no", "fi", "cs",
  "hu", "ro", "bg", "hr", "sk", "sl", "uk", "he", "th", "vi",
  "id", "ms", "gn",
];

export default defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: LOCALES.map((locale) => ({
    name: locale,
    title: locale.toUpperCase(),
    type: "string" as const,
  })),
});
