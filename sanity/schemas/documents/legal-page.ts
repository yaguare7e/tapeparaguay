import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      options: {
        list: [
          { title: "Terms & Conditions", value: "terms" },
          { title: "Privacy Policy", value: "privacy" },
          { title: "Cancellation Policy", value: "cancellation" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedBlock",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleEs: "title.es",
      slug: "slug",
    },
    prepare({ titleEn, titleEs, slug }) {
      return {
        title: titleEn || titleEs || slug || "Untitled Legal Page",
        subtitle: slug,
      };
    },
  },
});
