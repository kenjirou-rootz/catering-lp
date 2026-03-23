import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolio",
  title: "実績レポート",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "説明文",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "実績写真",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "ctaText",
      title: "CTAボタンテキスト",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "表示順",
      type: "number",
    }),
  ],
  orderings: [
    { title: "表示順", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
