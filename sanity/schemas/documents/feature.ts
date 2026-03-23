import { defineType, defineField } from "sanity";

export default defineType({
  name: "feature",
  title: "特異性ポイント",
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
      name: "icon",
      title: "アイコン画像",
      type: "image",
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
