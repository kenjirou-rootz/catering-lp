import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "Kitaoとは？",
  type: "document",
  fields: [
    defineField({
      name: "salesText",
      title: "セールスポイント・紹介テキスト",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "careerText",
      title: "経歴テキスト",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "画像",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "mediaType",
      title: "メディアタイプ",
      type: "string",
      description: "メインビジュアルに画像と動画のどちらを使用するか選択",
      options: {
        list: [
          { title: "画像（上の画像配列の1枚目を使用）", value: "image" },
          { title: "動画", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "video",
      title: "動画ファイル",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description:
        "推奨: MP4形式 / 720×900px（4:5比率）/ 30秒以内 / 10MB以下 / H.264コーデック。WebM形式も対応。ファイルが大きいと読み込みが遅くなります。",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "videoPoster",
      title: "動画サムネイル（ポスター画像）",
      type: "image",
      options: { hotspot: true },
      description:
        "動画の読み込み中に表示されるサムネイル画像。未設定の場合は黒背景になります。",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
  ],
});
