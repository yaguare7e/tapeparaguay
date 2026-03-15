import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricing",
  title: "Pricing",
  type: "object",
  fields: [
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "USD",
      options: {
        list: [
          { title: "USD", value: "USD" },
          { title: "EUR", value: "EUR" },
          { title: "GBP", value: "GBP" },
          { title: "PYG", value: "PYG" },
          { title: "ARS", value: "ARS" },
          { title: "BRL", value: "BRL" },
        ],
      },
    }),
    defineField({
      name: "per",
      title: "Per",
      type: "string",
      options: {
        list: [
          { title: "Person", value: "person" },
          { title: "Group", value: "group" },
          { title: "Night", value: "night" },
          { title: "Package", value: "package" },
        ],
      },
    }),
  ],
});
