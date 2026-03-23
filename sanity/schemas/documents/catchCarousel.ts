import { defineType, defineField } from "sanity";

export default defineType({
  name: "catchCarousel",
  title: "キャッチ＋カルーセル",
  type: "document",
  fields: [
    defineField({
      name: "catchCopy",
      title: "キャッチコピー",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "ディスクリプション",
      type: "text",
    }),
    defineField({
      name: "carouselImages",
      title: "カルーセル画像",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required().min(3),
    }),
  ],
});
