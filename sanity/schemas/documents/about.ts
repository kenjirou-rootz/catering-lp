import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "Kitaoとは？",
  type: "document",
  fields: [
    defineField({
      name: "salesText",
      title: "セールスポイント・紹介テキスト",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "careerText",
      title: "経歴テキスト",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "画像",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
