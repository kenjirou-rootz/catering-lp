import { defineType, defineField } from "sanity";

export default defineType({
  name: "flowStep",
  title: "ご利用の流れ",
  type: "document",
  fields: [
    defineField({
      name: "stepNumber",
      title: "ステップ番号",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "ステップタイトル",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "ステップ説明",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "アイコン画像",
      type: "image",
    }),
  ],
  orderings: [
    { title: "ステップ順", name: "stepAsc", by: [{ field: "stepNumber", direction: "asc" }] },
  ],
});
