"use client";

import { useActionState } from "react";
import { consultAction, type ConsultState } from "./actions";
import { JOB_CATEGORIES, PREFECTURES } from "@/lib/constants";

const initialState: ConsultState = {};

export function ConsultForm({ jobSlug }: { jobSlug?: string }) {
  const boundAction = consultAction.bind(null, jobSlug);
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
          <label className="block text-xs font-medium text-slate-600 mb-1">電話番号 *</label>
          <input type="tel" name="phone" required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">メールアドレス</label>
          <input type="email" name="email" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">希望職種</label>
          <select name="desiredCategory" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">未定・相談したい</option>
            {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">希望エリア（都道府県）</label>
          <select name="desiredArea" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">未定・相談したい</option>
            {PREFECTURES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">お住まいの都道府県</label>
        <select name="prefecture" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="">選択してください</option>
          {PREFECTURES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">お持ちの資格</label>
        <input name="qualifications" placeholder="例: 正看護師、介護福祉士 など（未取得でもOK）" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">ご相談内容</label>
        <textarea name="message" rows={4} placeholder="転職時期の相談、給与や働き方の希望、キャリアの悩みなど、どんな内容でもお気軽にどうぞ" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-brand-700 transition disabled:opacity-60"
      >
        {pending ? "送信中..." : "無料でキャリア相談する"}
      </button>
      <p className="text-xs text-slate-400 text-center">
        求人が決まっていなくてもご相談いただけます。専任のキャリアアドバイザーがご連絡いたします。
      </p>
    </form>
  );
}
