import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, attendees, budget, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "必須項目が入力されていません" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.log("Contact form submission (Resend not configured):", body);
      return NextResponse.json({ success: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Kitao Catering <noreply@yourdomain.com>",
        to: [process.env.CONTACT_EMAIL || "info@example.com"],
        subject: `【お問い合わせ】${name}様より`,
        html: `
          <h2>お問い合わせ内容</h2>
          <p><strong>お名前:</strong> ${name}</p>
          <p><strong>メール:</strong> ${email}</p>
          <p><strong>電話:</strong> ${phone}</p>
          ${date ? `<p><strong>利用予定日:</strong> ${date}</p>` : ""}
          ${attendees ? `<p><strong>予定人数:</strong> ${attendees}名</p>` : ""}
          ${budget ? `<p><strong>ご予算:</strong> ${budget}</p>` : ""}
          <p><strong>お問い合わせ内容:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "送信に失敗しました。しばらく後にもう一度お試しください。" },
      { status: 500 }
    );
  }
}
