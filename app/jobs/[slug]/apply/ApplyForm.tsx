"use client";

import { useActionState } from "react";
import { applyAction, type ApplyState } from "./actions";

const initialState: ApplyState = {};

export function ApplyForm({ jobSlug }: { jobSlug: string }) {
  const boundAction = applyAction.bind(null, jobSlug);
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <p className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">{state.error}</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">姓 *</label>
          <input name="lastName" required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">名 *</label>
          <input name="firstName" required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">セイ</label>
          <input name="lastNameKana" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">メイ</label>
          <input name="firstNameKana" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">生年月日</label>
          <input type="date" name="birthDate" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">性別</label>
          <select name="gender" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">未選択</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">電話番号 *</label>
          <input type="tel" name="phone" required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">メールアドレス</label>
          <input type="email" name="email" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">お住まい（都道府県・市区町村）</label>
        <div className="grid grid-cols-2 gap-3">
          <input name="prefecture" placeholder="例: 東京都" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          <input name="address" placeholder="例: 渋谷区1-2-3" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">お持ちの資格</label>
        <input name="qualifications" placeholder="例: 正看護師、介護福祉士 など" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">ご質問・備考</label>
        <textarea name="message" rows={4} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-brand-700 transition disabled:opacity-60"
      >
        {pending ? "送信中..." : "この内容で応募する"}
      </button>
      <p className="text-xs text-slate-400 text-center">
        応募後、Recriveのキャリアアドバイザーよりご連絡いたします。
      </p>
    </form>
  );
}
