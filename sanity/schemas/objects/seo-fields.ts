import { defineField, defineType } from "sanity";

export default defineType({
  name: "seoFields",
  title: "SEO Fields",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "localizedString",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "localizedText",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
