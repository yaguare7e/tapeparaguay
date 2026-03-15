import { JsonLd } from "./json-ld";

interface ReviewSchemaProps {
  reviews: {
    author: string;
    rating: number;
    text: string;
  }[];
}

export function ReviewSchema({ reviews }: ReviewSchemaProps) {
  if (reviews.length === 0) return null;

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "Tape Paraguay",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avgRating.toFixed(1),
          bestRating: "5",
          worstRating: "1",
          ratingCount: reviews.length,
        },
        review: reviews.map((review) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: review.author,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: "5",
          },
          reviewBody: review.text,
        })),
      }}
    />
  );
}
