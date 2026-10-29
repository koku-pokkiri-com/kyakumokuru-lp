import { NextResponse } from "next/server";
import { sendInquiryMail } from "@/lib/inquiry-mail";

export const runtime = "nodejs";

type Field = { label: string; value: string };

export async function POST(req: Request) {
  let data: { fields?: Field[]; email?: string; name?: string; message?: string; hp?: string };
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "リクエストの形式が正しくありません。" }, { status: 400 });
  }

  // ハニーポット（ボット送信のみ静かに終了する）
  if (data.hp && String(data.hp).trim() !== "") {
    console.warn("[contact] honeypot tripped — bot submission dropped");
    return NextResponse.json({ ok: true });
  }

  const result = await sendInquiryMail({
    email: String(data.email ?? ""),
    name: String(data.name ?? ""),
    message: String(data.message ?? ""),
    kind: "お問い合わせ",
    fields: data.fields ?? [],
  });

  // 送れていない時に ok を返さない
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.message },
      { status: result.reason === "invalid_input" ? 422 : 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
