import type { Metadata } from "next";
import { fetchJobDetail } from "@/lib/api";
import { ConsultForm } from "./ConsultForm";

export const metadata: Metadata = {
  title: "キャリアアドバイザーに相談する",
  description: "求人がまだ決まっていない方も大丈夫。医療・介護専門のキャリアアドバイザーに無料で相談できます。",
};

export default async function ConsultPage({ searchParams }: { searchParams: Promise<{ job?: string }> }) {
  const { job: jobSlug } = await searchParams;
  const job = jobSlug ? await fetchJobDetail(jobSlug) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-black mb-2">キャリアアドバイザーに相談する</h1>
      <p className="text-sm text-slate-500 mb-8">
        「求人はまだ決めていないけど話を聞いてみたい」「今の職場の悩みを相談したい」——そんな方もお気軽にご相談ください。専任のキャリアアドバイザーが無料でサポートします。
      </p>

      {job && (
        <div className="bg-brand-50 rounded-2xl p-5 mb-8">
          <p className="text-xs text-brand-600 font-bold mb-1">この求人についてのご相談</p>
          <h2 className="font-bold text-lg">{job.title}</h2>
          <p className="text-sm text-slate-500">{job.company.name}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-8">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 bg-brand-50 rounded-full px-4 py-2">
          ¥0 ご利用完全無料
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 bg-brand-50 rounded-full px-4 py-2">
          今すぐ転職しない方もOK
        </span>
      </div>

      <ConsultForm jobSlug={jobSlug} />
    </div>
  );
}
