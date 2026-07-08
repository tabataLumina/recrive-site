"use server";

import { redirect } from "next/navigation";
import { submitApplication } from "@/lib/api";

export type ApplyState = { error?: string };

export async function applyAction(rawJobSlug: string, _prevState: ApplyState, formData: FormData): Promise<ApplyState> {
  // クライアント→サーバーアクション間の引数受け渡しでURLエンコードされた状態のまま渡ってくるため明示的にデコードする
  let jobSlug = rawJobSlug;
  try {
    jobSlug = decodeURIComponent(rawJobSlug);
  } catch {
    // デコードできない場合は元の値をそのまま使用
  }

  const lastName = String(formData.get("lastName") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!lastName || !firstName || !phone) {
    return { error: "お名前と電話番号は必須です。" };
  }

  const result = await submitApplication({
    jobSlug,
    lastName,
    firstName,
    lastNameKana: String(formData.get("lastNameKana") ?? ""),
    firstNameKana: String(formData.get("firstNameKana") ?? ""),
    birthDate: String(formData.get("birthDate") ?? "") || undefined,
    gender: String(formData.get("gender") ?? ""),
    postalCode: String(formData.get("postalCode") ?? ""),
    prefecture: String(formData.get("prefecture") ?? ""),
    address: String(formData.get("address") ?? ""),
    phone,
    email: String(formData.get("email") ?? ""),
    qualifications: String(formData.get("qualifications") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  if (!result.success) {
    return { error: result.error ?? "応募に失敗しました。時間をおいて再度お試しください。" };
  }

  redirect("/apply/complete");
}
