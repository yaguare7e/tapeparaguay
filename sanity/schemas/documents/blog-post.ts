import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
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
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localizedText",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedBlock",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Francisco Zubia",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "segments",
      title: "Segments",
      type: "array",
      of: [{ type: "string" }],
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
      name: "heroImage",
      title: "Hero Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),
  ],
  orderings: [
    {
      title: "Published Date, Newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleEs: "title.es",
      author: "author",
      publishedAt: "publishedAt",
      media: "heroImage.image",
    },
    prepare({ titleEn, titleEs, author, publishedAt, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "No date";
      return {
        title: titleEn || titleEs || "Untitled Post",
        subtitle: `${author || "Unknown"} — ${date}`,
        media,
      };
    },
  },
});
