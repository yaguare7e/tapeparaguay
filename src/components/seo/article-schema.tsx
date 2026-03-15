import { JsonLd } from "./json-ld";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  section?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  author,
  publishedAt,
  modifiedAt,
  section,
}: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `https://tapeparaguay.com${url}`,
        image,
        author: {
          "@type": "Person",
          name: author,
        },
        publisher: {
          "@type": "Organization",
          name: "Tape Paraguay",
          logo: {
            "@type": "ImageObject",
            url: "https://tapeparaguay.com/images/logo.png",
          },
        },
        datePublished: publishedAt,
        ...(modifiedAt && { dateModified: modifiedAt }),
        ...(section && { articleSection: section }),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://tapeparaguay.com${url}`,
        },
      }}
    />
  );
}
