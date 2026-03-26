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
      title: "スライド（画像ペア）",
      type: "array",
      of: [
        {
          type: "object",
          name: "imagePair",
          title: "画像ペア",
          fields: [
            defineField({
              name: "imageLarge",
              title: "メイン画像（左・大）",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "imageSmall",
              title: "サブ画像（右・小）",
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
            select: { media: "imageLarge", title: "title" },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(3),
    }),
  ],
});
