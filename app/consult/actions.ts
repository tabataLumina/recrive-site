"use server";

import { redirect } from "next/navigation";
import { submitConsult } from "@/lib/api";

export type ConsultState = { error?: string };

export async function consultAction(jobSlug: string | undefined, _prevState: ConsultState, formData: FormData): Promise<ConsultState> {
  const lastName = String(formData.get("lastName") ?? "").trim();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!lastName || !firstName || !phone) {
    return { error: "お名前と電話番号は必須です。" };
  }

  const result = await submitConsult({
    jobSlug,
    lastName,
    firstName,
    lastNameKana: String(formData.get("lastNameKana") ?? ""),
    firstNameKana: String(formData.get("firstNameKana") ?? ""),
    gender: String(formData.get("gender") ?? ""),
    prefecture: String(formData.get("prefecture") ?? ""),
    phone,
    email: String(formData.get("email") ?? ""),
    qualifications: String(formData.get("qualifications") ?? ""),
    desiredCategory: String(formData.get("desiredCategory") ?? ""),
    desiredArea: String(formData.get("desiredArea") ?? ""),
    message: String(formData.get("message") ?? ""),
  });

  if (!result.success) {
    return { error: result.error ?? "送信に失敗しました。時間をおいて再度お試しください。" };
  }

  redirect("/consult/complete");
}
