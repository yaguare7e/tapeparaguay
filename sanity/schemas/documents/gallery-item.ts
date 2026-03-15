import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "localizedString",
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
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "takenAt",
      title: "Date Taken",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      captionEn: "caption.en",
      captionEs: "caption.es",
      segment: "segment",
      media: "image.image",
    },
    prepare({ captionEn, captionEs, segment, media }) {
      return {
        title: captionEn || captionEs || "Untitled",
        subtitle: segment,
        media,
      };
    },
  },
});
