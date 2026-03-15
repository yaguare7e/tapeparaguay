import { groq } from "next-sanity";

// ============================================================================
// TOURS
// ============================================================================

export const FEATURED_TOURS_QUERY = groq`
  *[_type == "tour" && featured == true] | order(_createdAt desc) {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "shortDescription": shortDescription[$locale],
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    price,
    duration,
    difficulty,
    segment
  }
`;

export const TOURS_BY_SEGMENT_QUERY = groq`
  *[_type == "tour" && segment == $segment] | order(_createdAt desc) {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "shortDescription": shortDescription[$locale],
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    price,
    duration,
    difficulty,
    segment
  }
`;

export const ALL_TOURS_QUERY = groq`
  *[_type == "tour"] | order(_createdAt desc) {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "shortDescription": shortDescription[$locale],
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    price,
    duration,
    difficulty,
    segment,
    featured
  }
`;

export const TOUR_BY_SLUG_QUERY = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    segment,
    "shortDescription": shortDescription[$locale],
    "fullDescription": fullDescription[$locale],
    duration,
    difficulty,
    price,
    itinerary[] {
      dayNumber,
      "title": title[$locale],
      "description": description[$locale],
      "activities": activities[].[$locale]
    },
    "includes": includes[$locale],
    "excludes": excludes[$locale],
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    gallery[] {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    destinations[]-> {
      _id,
      "title": title[$locale],
      "slug": slug.current,
      region
    },
    featured,
    maxGroupSize,
    tourLanguages,
    seo {
      "metaTitle": metaTitle[$locale],
      "metaDescription": metaDescription[$locale],
      ogImage {
        asset->,
        hotspot,
        crop
      }
    }
  }
`;

// ============================================================================
// DESTINATIONS
// ============================================================================

export const FEATURED_DESTINATIONS_QUERY = groq`
  *[_type == "destination" && featured == true] | order(_createdAt desc) {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "description": description[$locale],
    segments,
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    region
  }
`;

export const DESTINATIONS_BY_SEGMENT_QUERY = groq`
  *[_type == "destination" && $segment in segments] | order(_createdAt desc) {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "description": description[$locale],
    segments,
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    region
  }
`;

export const ALL_DESTINATIONS_QUERY = groq`
  *[_type == "destination"] | order(_createdAt desc) {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "description": description[$locale],
    segments,
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    region,
    featured
  }
`;

export const DESTINATION_BY_SLUG_QUERY = groq`
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "description": description[$locale],
    segments,
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    gallery[] {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    location,
    region,
    mapEmbedUrl,
    featured,
    seo {
      "metaTitle": metaTitle[$locale],
      "metaDescription": metaDescription[$locale],
      ogImage {
        asset->,
        hotspot,
        crop
      }
    },
    "tours": *[_type == "tour" && references(^._id)] {
      _id,
      "title": title[$locale],
      "slug": slug.current,
      segment,
      "shortDescription": shortDescription[$locale],
      heroImage {
        image {
          asset->,
          hotspot,
          crop
        },
        "alt": alt[$locale]
      },
      price,
      duration
    }
  }
`;

// ============================================================================
// BLOG POSTS
// ============================================================================

export const LATEST_BLOG_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) [0...6] {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "excerpt": excerpt[$locale],
    author,
    publishedAt,
    categories,
    segments,
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    featured,
    readingTime
  }
`;

export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "excerpt": excerpt[$locale],
    "body": body[$locale],
    author,
    publishedAt,
    categories,
    segments,
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    readingTime,
    seo {
      "metaTitle": metaTitle[$locale],
      "metaDescription": metaDescription[$locale],
      ogImage {
        asset->,
        hotspot,
        crop
      }
    }
  }
`;

export const ALL_BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) [$start...$end] {
    _id,
    "title": title[$locale],
    "slug": slug.current,
    "excerpt": excerpt[$locale],
    author,
    publishedAt,
    categories,
    segments,
    heroImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    featured,
    readingTime
  }
`;

// ============================================================================
// TESTIMONIALS
// ============================================================================

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    name,
    location,
    "quote": quote[$locale],
    rating,
    segment,
    avatar {
      asset->,
      hotspot,
      crop
    }
  }
`;

export const TESTIMONIALS_BY_SEGMENT_QUERY = groq`
  *[_type == "testimonial" && segment == $segment] | order(_createdAt desc) {
    _id,
    name,
    location,
    "quote": quote[$locale],
    rating,
    segment,
    avatar {
      asset->,
      hotspot,
      crop
    }
  }
`;

// ============================================================================
// FAQ
// ============================================================================

export const FAQ_QUERY = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    "question": question[$locale],
    "answer": answer[$locale],
    segment,
    order
  }
`;

export const FAQ_BY_SEGMENT_QUERY = groq`
  *[_type == "faq" && segment == $segment] | order(order asc) {
    _id,
    "question": question[$locale],
    "answer": answer[$locale],
    segment,
    order
  }
`;

// ============================================================================
// GALLERY
// ============================================================================

export const GALLERY_QUERY = groq`
  *[_type == "galleryItem"] | order(takenAt desc) {
    _id,
    image {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    "caption": caption[$locale],
    segment,
    tags,
    takenAt
  }
`;

// ============================================================================
// LEGAL PAGES
// ============================================================================

export const LEGAL_PAGE_QUERY = groq`
  *[_type == "legalPage" && slug == $slug][0] {
    _id,
    slug,
    "title": title[$locale],
    "body": body[$locale],
    lastUpdated
  }
`;

// ============================================================================
// SITE SETTINGS
// ============================================================================

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    _id,
    phone,
    email,
    address,
    "aboutText": aboutText[$locale],
    socialLinks {
      instagram,
      facebook,
      youtube,
      tiktok,
      linkedin
    },
    logo {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    },
    ogDefaultImage {
      image {
        asset->,
        hotspot,
        crop
      },
      "alt": alt[$locale]
    }
  }
`;

// ============================================================================
// SEARCH
// ============================================================================

export const SEARCH_QUERY = groq`
  {
    "tours": *[_type == "tour" && (title[$locale] match $query || shortDescription[$locale] match $query)] {
      _id,
      _type,
      "title": title[$locale],
      "slug": slug.current,
      "shortDescription": shortDescription[$locale],
      segment,
      heroImage {
        image {
          asset->,
          hotspot,
          crop
        },
        "alt": alt[$locale]
      }
    },
    "destinations": *[_type == "destination" && title[$locale] match $query] {
      _id,
      _type,
      "title": title[$locale],
      "slug": slug.current,
      region,
      heroImage {
        image {
          asset->,
          hotspot,
          crop
        },
        "alt": alt[$locale]
      }
    },
    "blogPosts": *[_type == "blogPost" && (title[$locale] match $query || excerpt[$locale] match $query)] {
      _id,
      _type,
      "title": title[$locale],
      "slug": slug.current,
      "excerpt": excerpt[$locale],
      publishedAt,
      heroImage {
        image {
          asset->,
          hotspot,
          crop
        },
        "alt": alt[$locale]
      }
    }
  }
`;
