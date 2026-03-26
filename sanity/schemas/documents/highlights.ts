import { defineType, defineField } from "sanity";

export default defineType({
  name: "highlights",
  title: "ハイライト",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "説明文",
      type: "text",
      description: "訴求テキスト（例: 60,000円から受けたわっている的なポイント文）",
    }),
    defineField({
      name: "slides",
      title: "スライド",
      type: "array",
      of: [
        {
          type: "object",
          name: "highlightSlide",
          title: "スライド",
          fields: [
            defineField({
              name: "image",
              title: "スライド画像",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "スライドタイトル",
              type: "string",
              description: "例: 季節の食材を活かして",
            }),
            defineField({
              name: "caption",
              title: "キャプション",
              type: "text",
              rows: 3,
              description: "スライドの説明文（任意）",
            }),
          ],
          preview: {
            select: { media: "image", title: "title" },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(5),
    }),
  ],
});
