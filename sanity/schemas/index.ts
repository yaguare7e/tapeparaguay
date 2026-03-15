// Object types
import localizedString from "./objects/localized-string";
import localizedText from "./objects/localized-text";
import localizedBlock from "./objects/localized-block";
import seoFields from "./objects/seo-fields";
import pricing from "./objects/pricing";
import itineraryDay from "./objects/itinerary-day";
import imageWithAlt from "./objects/image-with-alt";
import cta from "./objects/cta";

// Document types
import destination from "./documents/destination";
import tour from "./documents/tour";
import blogPost from "./documents/blog-post";
import testimonial from "./documents/testimonial";
import faq from "./documents/faq";
import galleryItem from "./documents/gallery-item";
import legalPage from "./documents/legal-page";
import siteSettings from "./documents/site-settings";

export const schemaTypes = [
  // Objects (must be registered before documents that reference them)
  localizedString,
  localizedText,
  localizedBlock,
  seoFields,
  pricing,
  itineraryDay,
  imageWithAlt,
  cta,

  // Documents
  destination,
  tour,
  blogPost,
  testimonial,
  faq,
  galleryItem,
  legalPage,
  siteSettings,
];
