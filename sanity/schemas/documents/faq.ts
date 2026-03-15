import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localizedBlock",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Adventure", value: "adventure" },
          { title: "Culture", value: "culture" },
          { title: "Invest", value: "invest" },
          { title: "Leisure", value: "leisure" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      questionEn: "question.en",
      questionEs: "question.es",
      segment: "segment",
    },
    prepare({ questionEn, questionEs, segment }) {
      return {
        title: questionEn || questionEs || "Untitled FAQ",
        subtitle: segment,
      };
    },
  },
});
