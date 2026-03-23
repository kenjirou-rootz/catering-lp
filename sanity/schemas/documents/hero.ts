import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "ヒーロー",
  type: "document",
  fields: [
    defineField({
      name: "catchCopy",
      title: "キャッチコピー",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backgroundImage",
      title: "背景画像",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "CTAボタンテキスト",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
