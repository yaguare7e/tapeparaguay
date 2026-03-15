import { defineField, defineType } from "sanity";

export default defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          { title: "Adventure", value: "adventure" },
          { title: "Culture", value: "culture" },
          { title: "Invest", value: "invest" },
          { title: "Leisure", value: "leisure" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "localizedText",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "localizedBlock",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      description: 'e.g., "3 days / 2 nights"',
      type: "string",
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Moderate", value: "moderate" },
          { title: "Challenging", value: "challenging" },
        ],
      },
      hidden: ({ parent }) => parent?.segment === "invest",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "pricing",
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [{ type: "itineraryDay" }],
    }),
    defineField({
      name: "includes",
      title: "Includes",
      type: "localizedBlock",
    }),
    defineField({
      name: "excludes",
      title: "Excludes",
      type: "localizedBlock",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "destinations",
      title: "Destinations",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "destination" }],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "maxGroupSize",
      title: "Max Group Size",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "tourLanguages",
      title: "Tour Languages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Spanish", value: "Spanish" },
          { title: "English", value: "English" },
          { title: "Portuguese", value: "Portuguese" },
          { title: "German", value: "German" },
          { title: "French", value: "French" },
          { title: "Guarani", value: "Guarani" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleEs: "title.es",
      segment: "segment",
      duration: "duration",
      media: "heroImage.image",
    },
    prepare({ titleEn, titleEs, segment, duration, media }) {
      return {
        title: titleEn || titleEs || "Untitled Tour",
        subtitle: `${segment || ""}${duration ? " — " + duration : ""}`,
        media,
      };
    },
  },
});
