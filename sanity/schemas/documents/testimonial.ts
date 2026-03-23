import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "利用者の声",
  type: "document",
  fields: [
    defineField({
      name: "reviewText",
      title: "レビューテキスト",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "personPhoto",
      title: "利用者写真",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "eventPhoto",
      title: "会場・料理の様子写真",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "name",
      title: "利用者名",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "会社名",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "表示順",
      type: "number",
    }),
  ],
});
