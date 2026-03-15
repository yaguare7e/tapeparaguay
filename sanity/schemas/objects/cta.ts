import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "localizedString",
    }),
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      labelEn: "label.en",
      labelEs: "label.es",
      href: "href",
    },
    prepare({ labelEn, labelEs, href }) {
      return {
        title: labelEn || labelEs || "Untitled CTA",
        subtitle: href,
      };
    },
  },
});
