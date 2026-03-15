import { JsonLd } from "./json-ld";

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "Tape Paraguay",
        alternateName: "Tape Paraguay Travel Agency",
        url: "https://tapeparaguay.com",
        logo: "https://tapeparaguay.com/images/logo.png",
        description:
          "Paraguay's premier travel agency offering adventure tours, cultural experiences, investment guidance, and leisure packages. Founded by Francisco Zubia.",
        founder: {
          "@type": "Person",
          name: "Francisco Zubia",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Asuncion",
          addressCountry: "PY",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -25.2637,
          longitude: -57.5759,
        },
        areaServed: {
          "@type": "Country",
          name: "Paraguay",
        },
        serviceType: [
          "Adventure Tourism",
          "Cultural Tourism",
          "Business Tourism",
          "Investment Consulting",
          "Residency Assistance",
          "Leisure Travel",
        ],
        knowsLanguage: [
          "Spanish",
          "English",
          "Portuguese",
          "German",
          "French",
          "Guarani",
        ],
        sameAs: [
          "https://instagram.com/tapeparaguay",
          "https://facebook.com/tapeparaguay",
          "https://youtube.com/@tapeparaguay",
          "https://tiktok.com/@tapeparaguay",
          "https://linkedin.com/company/tapeparaguay",
        ],
      }}
    />
  );
}
