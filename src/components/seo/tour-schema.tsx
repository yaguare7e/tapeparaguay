import { JsonLd } from "./json-ld";

interface TourSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  duration: string;
  price: number;
  currency: string;
  segment: string;
  difficulty?: string;
  maxGroupSize?: number;
  destinations?: string[];
}

export function TourSchema({
  name,
  description,
  url,
  image,
  duration,
  price,
  currency,
  segment,
  difficulty,
  maxGroupSize,
  destinations,
}: TourSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name,
        description,
        url: `https://tapeparaguay.com${url}`,
        image,
        touristType: segment,
        itinerary: {
          "@type": "ItemList",
          description: duration,
        },
        ...(destinations && {
          touristDestination: destinations.map((dest) => ({
            "@type": "TouristDestination",
            name: dest,
          })),
        }),
        offers: {
          "@type": "Offer",
          price,
          priceCurrency: currency,
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "TravelAgency",
            name: "Tape Paraguay",
          },
        },
        provider: {
          "@type": "TravelAgency",
          name: "Tape Paraguay",
          url: "https://tapeparaguay.com",
        },
        ...(difficulty && {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "difficulty",
            value: difficulty,
          },
        }),
        ...(maxGroupSize && {
          maximumAttendeeCapacity: maxGroupSize,
        }),
      }}
    />
  );
}
