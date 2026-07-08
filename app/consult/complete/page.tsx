import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "ご相談ありがとうございました" };

export default function ConsultCompletePage() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl mx-auto mb-6">
        ✓
      </div>
      <h1 className="text-2xl font-black mb-3">ご相談ありがとうございました</h1>
      <p className="text-slate-500 mb-8 leading-relaxed">
        内容を受け付けました。Recriveのキャリアアドバイザーが確認のうえ、担当者よりご連絡いたします。
      </p>
      <Link href="/jobs" className="inline-block bg-brand-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-brand-700 transition">
        求人を見てみる
      </Link>
    </div>
  );
}
