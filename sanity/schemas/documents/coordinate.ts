import { defineType, defineField } from "sanity";

export default defineType({
  name: "coordinate",
  title: "テーブルコーディネート",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "識別キー",
      type: "string",
      description: "elegant / casual / wa-modern（コード側でタイトル固定に使用）",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "ショートディスクリプション",
      type: "text",
    }),
    defineField({
      name: "photos",
      title: "コーディネート写真（最大3枚）",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "order",
      title: "表示順",
      type: "number",
    }),
  ],
});
