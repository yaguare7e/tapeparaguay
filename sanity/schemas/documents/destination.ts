import { defineField, defineType } from "sanity";

export default defineType({
  name: "destination",
  title: "Destination",
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
      name: "description",
      title: "Description",
      type: "localizedBlock",
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
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "Asuncion", value: "Asuncion" },
          { title: "Central", value: "Central" },
          { title: "Chaco", value: "Chaco" },
          { title: "Itapua", value: "Itapua" },
          { title: "Alto Parana", value: "Alto Parana" },
          { title: "Misiones", value: "Misiones" },
          { title: "Amambay", value: "Amambay" },
          { title: "Canindeyu", value: "Canindeyu" },
          { title: "Concepcion", value: "Concepcion" },
          { title: "Paraguari", value: "Paraguari" },
          { title: "Caazapa", value: "Caazapa" },
          { title: "Guaira", value: "Guaira" },
          { title: "Caaguazu", value: "Caaguazu" },
          { title: "San Pedro", value: "San Pedro" },
          { title: "Neembucu", value: "Neembucu" },
          { title: "Presidente Hayes", value: "Presidente Hayes" },
          { title: "Boqueron", value: "Boqueron" },
          { title: "Alto Paraguay", value: "Alto Paraguay" },
        ],
      },
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
      name: "mapEmbedUrl",
      title: "Map Embed URL",
      description: "Optional OpenStreetMap embed URL",
      type: "string",
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleEs: "title.es",
      region: "region",
      media: "heroImage.image",
    },
    prepare({ titleEn, titleEs, region, media }) {
      return {
        title: titleEn || titleEs || "Untitled Destination",
        subtitle: region,
        media,
      };
    },
  },
});
