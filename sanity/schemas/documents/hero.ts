import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "ヒーロー",
  type: "document",
  fields: [
    defineField({
      name: "catchCopy",
      title: "キャッチコピー",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badgeText",
      title: "バッジテキスト（H1見出し上部・装飾枠内）",
      type: "string",
      description: "ヒーローH1の上に枠囲みで表示される装飾テキスト",
      initialValue: "5ツ星シェフ監修のケータリングサービス",
    }),
    defineField({
      name: "mediaType",
      title: "背景メディアタイプ",
      type: "string",
      options: {
        list: [
          { title: "画像", value: "image" },
          { title: "動画", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backgroundImage",
      title: "背景画像",
      type: "image",
      options: { hotspot: true },
      description: "メディアタイプが「画像」の場合、または動画のフォールバック用",
      hidden: ({ parent }) => parent?.mediaType === "video",
    }),
    defineField({
      name: "backgroundVideo",
      title: "背景動画",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description: "MP4またはWebM形式。自動再生・ループ・ミュートで表示されます",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "videoPoster",
      title: "動画ポスター画像",
      type: "image",
      options: { hotspot: true },
      description: "動画読み込み中に表示される静止画",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "ctaText",
      title: "CTAボタンテキスト",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
