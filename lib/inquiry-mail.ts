/**
 * 共通問い合わせ送信モジュール（グループA/B＝Next.jsサイト用）
 *
 * Server Action からも Route Handler からも呼べる。依存パッケージなし（fetch のみ）。
 * サイトごとの差分は環境変数だけにする。
 *
 * 必要な環境変数:
 *   RESEND_API_KEY        … Resend の APIキー（全サイト共通の値）
 *   CONTACT_TO_EMAIL      … 顧客の受信先アドレス（サイトごと）
 *   CONTACT_CUSTOMER_NAME … 差出人の表示名に使う顧客名（サイトごと）
 *   MAIL_FROM_ADDRESS     … 送信専用アドレス（全サイト共通）
 *
 * ■ 設計上の約束（2026-07-27 の全社事故を受けて）
 *   この関数は「送れなかった」を必ず戻り値で返す。呼び出し側は ok:false を
 *   そのまま訪問者へのエラー表示に繋ぐこと。ok:true に読み替えて握りつぶさない。
 *   環境変数が無い場合も success 扱いにしない（それが今回の事故の原因）。
 */

export type InquiryField = { label: string; value: string };

export type SendInquiryInput = {
  /** 問い合わせ主のメールアドレス。Reply-To に入る */
  email: string;
  /** 問い合わせ主の氏名。件名に使う */
  name?: string;
  /** 本文（必須） */
  message: string;
  /** メールに表として載せる全項目 */
  fields: InquiryField[];
  /** 件名の頭に付けるラベル。既定は「お問い合わせ」 */
  kind?: string;
};

export type SendInquiryResult =
  | { ok: true; id: string }
  | { ok: false; reason: 'invalid_input' | 'not_configured' | 'send_failed'; message: string };

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** 訪問者に見せる汎用エラー文。電話番号などのフォールバックは呼び出し側で足す */
const GENERIC_ERROR =
  '送信に失敗しました。お手数ですが、お電話またはメールで直接ご連絡ください。';

const escapeHtml = (s = ''): string =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const nl2br = (s = ''): string => escapeHtml(s).replace(/\r?\n/g, '<br>');

function renderRows(fields: InquiryField[]): string {
  return fields
    .map(
      (f) =>
        `<tr>
          <td style="padding:10px 12px;background:#f7f7f7;border-bottom:1px solid #e5e5e5;white-space:nowrap;vertical-align:top;color:#555;font-size:13px">${escapeHtml(
            f.label
          )}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e5e5;line-height:1.8;font-size:14px">${
            nl2br(f.value) || '（未入力）'
          }</td>
        </tr>`
    )
    .join('');
}

function renderText(fields: InquiryField[]): string {
  return fields.map((f) => `■ ${f.label}\n${f.value || '（未入力）'}`).join('\n\n');
}

export async function sendInquiryMail(input: SendInquiryInput): Promise<SendInquiryResult> {
  const email = (input.email || '').trim();
  const name = (input.name || '').trim();
  const message = (input.message || '').trim();
  const fields = input.fields || [];
  const kind = input.kind || 'お問い合わせ';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, reason: 'invalid_input', message: 'メールアドレスの形式をご確認ください。' };
  }
  if (!message) {
    return { ok: false, reason: 'invalid_input', message: 'お問い合わせ内容をご入力ください。' };
  }
  if (message.length > 8000 || name.length > 200 || email.length > 200) {
    return { ok: false, reason: 'invalid_input', message: '入力が長すぎます。' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const customer = process.env.CONTACT_CUSTOMER_NAME;
  const fromAddress = process.env.MAIL_FROM_ADDRESS;

  if (!apiKey || !to || !customer || !fromAddress) {
    const missing = [
      !apiKey && 'RESEND_API_KEY',
      !to && 'CONTACT_TO_EMAIL',
      !customer && 'CONTACT_CUSTOMER_NAME',
      !fromAddress && 'MAIL_FROM_ADDRESS',
    ]
      .filter(Boolean)
      .join(', ');
    console.error(
      `[inquiry] 設定不足のため送信できませんでした。未設定: ${missing}\n受信内容（消失防止のため記録）:\n${renderText(
        fields
      )}`
    );
    return { ok: false, reason: 'not_configured', message: GENERIC_ERROR };
  }

  const submittedAt = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const subject = `【${kind}】${name || email} 様`;

  const html = `
    <div style="font-family:'Hiragino Sans','Yu Gothic',sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#222">
      <h2 style="font-size:16px;margin:0 0 4px">ウェブサイトのフォームから新しい${escapeHtml(
        kind
      )}が届きました。</h2>
      <p style="margin:0 0 20px;color:#777;font-size:12px">受信日時：${escapeHtml(submittedAt)}</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e5e5e5">
        ${renderRows(fields)}
      </table>
      <p style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;color:#777;font-size:12px">
        このメールにそのまま返信すると、お問い合わせされた方（${escapeHtml(
          email
        )}）に直接届きます。
      </p>
    </div>`;

  const text =
    `ウェブサイトのフォームから新しい${kind}が届きました。\n受信日時：${submittedAt}\n\n` +
    `${renderText(fields)}\n\n` +
    `※このメールにそのまま返信すると、お問い合わせされた方（${email}）に直接届きます。`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${customer}｜${kind} <${fromAddress}>`,
        to: [to],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(
        `[inquiry] Resend HTTP ${res.status} ${detail}\n受信内容:\n${renderText(fields)}`
      );
      return { ok: false, reason: 'send_failed', message: GENERIC_ERROR };
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id || '' };
  } catch (err) {
    console.error(`[inquiry] 送信時エラー`, err, `\n受信内容:\n${renderText(fields)}`);
    return { ok: false, reason: 'send_failed', message: GENERIC_ERROR };
  }
}
