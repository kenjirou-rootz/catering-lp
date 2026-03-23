import { defineType, defineField } from "sanity";

export default defineType({
  name: "venue",
  title: "レンタル会場",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "説明テキスト",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      title: "会場写真",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
