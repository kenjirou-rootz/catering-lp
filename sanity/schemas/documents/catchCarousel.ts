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
      description: "サムネイル画像（動画がない場合はこの画像のみ表示）",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "carouselVideos",
      title: "カルーセル動画（任意）",
      type: "array",
      of: [{ type: "file", options: { accept: "video/*" } }],
      description:
        "各画像に対応する動画。画像と同じ順番で設定してください。動画がないスライドは空のままにしてください。",
    }),
  ],
});
