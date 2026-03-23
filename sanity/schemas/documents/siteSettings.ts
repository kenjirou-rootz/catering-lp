import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "サイト設定",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "サイト名",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "ロゴ（メイン）",
      type: "image",
    }),
    defineField({
      name: "logoFooter",
      title: "ロゴ（フッター用）",
      type: "image",
    }),
    defineField({
      name: "ogImage",
      title: "OGP画像",
      type: "image",
    }),
    defineField({
      name: "contactEmail",
      title: "問い合わせ先メールアドレス",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "電話番号",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "住所",
      type: "text",
    }),
    defineField({
      name: "socialLinks",
      title: "SNSリンク",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "プラットフォーム", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
  ],
});
