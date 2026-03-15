import { defineField, defineType } from "sanity";

export default defineType({
  name: "itineraryDay",
  title: "Itinerary Day",
  type: "object",
  fields: [
    defineField({
      name: "dayNumber",
      title: "Day Number",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedBlock",
    }),
    defineField({
      name: "activities",
      title: "Activities",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
  ],
  preview: {
    select: {
      dayNumber: "dayNumber",
      titleEn: "title.en",
      titleEs: "title.es",
    },
    prepare({ dayNumber, titleEn, titleEs }) {
      return {
        title: `Day ${dayNumber}: ${titleEn || titleEs || "Untitled"}`,
      };
    },
  },
});
