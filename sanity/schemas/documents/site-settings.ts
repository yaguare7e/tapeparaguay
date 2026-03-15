import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "aboutText",
      title: "About Text",
      type: "localizedText",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "string",
        }),
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "string",
        }),
        defineField({
          name: "youtube",
          title: "YouTube",
          type: "string",
        }),
        defineField({
          name: "tiktok",
          title: "TikTok",
          type: "string",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "ogDefaultImage",
      title: "Default OG Image",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
