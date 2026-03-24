"use client";

import { useState } from "react";
import { AnimatedSectionHeading } from "@/components/ui/AnimatedSectionHeading";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";
type SectionHeading = { en: string; ja: string };

export function ContactSection({ heading }: { heading: SectionHeading }) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "送信に失敗しました");
      }

      setFormState("success");
      form.reset();
    } catch (err) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "送信に失敗しました"
      );
    }
  }

  if (formState === "success") {
    return (
      <section id="contact" className="section-padding bg-dark border-t-2 border-terra">
        <div className="container-site text-center">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-serif font-medium text-white mb-4">
              お問い合わせありがとうございます
            </h2>
            <p className="text-white/70 mb-8">
              内容を確認の上、担当者より折り返しご連絡いたします。
            </p>
            <Button
              onClick={() => setFormState("idle")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-dark"
            >
              新しいお問い合わせ
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const inputStyles =
    "w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-terra transition-colors";

  return (
    <section id="contact" className="section-padding bg-dark border-t-2 border-terra">
      <div className="container-site">
        <AnimatedSectionHeading
          title={heading.en}
          titleJa={heading.ja}
          subtitle="ケータリングに関するご相談・お見積もりなど、お気軽にお問い合わせください"
          className="[&_h2]:text-white [&_p]:text-white/70 [&_.bg-terra]:bg-terra-light"
        />
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block text-xs tracking-wider uppercase text-white/60 mb-3"
            >
              お名前 <span className="text-terra">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={inputStyles}
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs tracking-wider uppercase text-white/60 mb-3"
            >
              メールアドレス <span className="text-terra">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputStyles}
              placeholder="example@company.co.jp"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs tracking-wider uppercase text-white/60 mb-3"
            >
              電話番号 <span className="text-terra">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className={inputStyles}
              placeholder="03-1234-5678"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="date"
                className="block text-xs tracking-wider uppercase text-white/60 mb-3"
              >
                利用予定日
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className={inputStyles}
              />
            </div>
            <div>
              <label
                htmlFor="attendees"
                className="block text-xs tracking-wider uppercase text-white/60 mb-3"
              >
                予定人数
              </label>
              <input
                id="attendees"
                name="attendees"
                type="number"
                min="1"
                className={inputStyles}
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="budget"
              className="block text-xs tracking-wider uppercase text-white/60 mb-3"
            >
              ご予算
            </label>
            <select id="budget" name="budget" className={`${inputStyles} cursor-pointer`}>
              <option value="">選択してください</option>
              <option value="~10万円">〜10万円</option>
              <option value="10~30万円">10〜30万円</option>
              <option value="30~50万円">30〜50万円</option>
              <option value="50~100万円">50〜100万円</option>
              <option value="100万円~">100万円〜</option>
              <option value="相談したい">相談したい</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs tracking-wider uppercase text-white/60 mb-3"
            >
              お問い合わせ内容 <span className="text-terra">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={`${inputStyles} resize-vertical`}
              placeholder="ご質問・ご要望をお聞かせください"
            />
          </div>

          {formState === "error" ? (
            <div className="p-4 bg-red-500/20 border border-red-500/40">
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          ) : null}

          <div className="text-center pt-4">
            <Button
              type="submit"
              disabled={formState === "submitting"}
              className="min-w-[200px]"
            >
              {formState === "submitting" ? "送信中..." : "送信する"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
