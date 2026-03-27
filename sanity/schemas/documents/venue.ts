import { defineType, defineField } from "sanity";

export default defineType({
  name: "venue",
  title: "レンタル会場",
  type: "document",
  fields: [
    defineField({
      name: "cards",
      title: "会場カード",
      type: "array",
      of: [
        {
          type: "object",
          name: "venueCard",
          fields: [
            defineField({
              name: "category",
              title: "カテゴリ",
              type: "string",
              description: "例: ホテル会場、レストラン、ガーデン",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "会場名",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "説明テキスト",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "image",
              title: "会場写真",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "category",
              media: "image",
            },
          },
        },
      ],
      validation: (rule) => rule.max(3),
    }),
  ],
});
