import { defineType, defineField } from "sanity";

export default defineType({
  name: "pricingPlan",
  title: "料金プラン",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "基本料金", value: "basic" },
          { title: "フード", value: "food" },
          { title: "ドリンク", value: "drink" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "planName",
      title: "プラン名",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "サムネイル画像",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overview",
      title: "概要テキスト",
      type: "text",
    }),
    defineField({
      name: "includes",
      title: "含まれる内容リスト",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "notes",
      title: "留意事項テキスト",
      type: "text",
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
