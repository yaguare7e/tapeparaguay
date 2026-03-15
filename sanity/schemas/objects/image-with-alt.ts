import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      altEn: "alt.en",
      altEs: "alt.es",
      media: "image",
    },
    prepare({ altEn, altEs, media }) {
      return {
        title: altEn || altEs || "No alt text",
        media,
      };
    },
  },
});
