import Link from "next/link";
import type { Metadata } from "next";
import { fetchJobs } from "@/lib/api";
import { JOB_CATEGORIES, PREFECTURES, EMPLOYMENT_TYPES, formatSalary } from "@/lib/constants";
import { CityMultiInput } from "./CityMultiInput";

export const metadata: Metadata = {
  title: "求人を探す",
  description: "看護師・介護職の求人を検索。エリアや職種、雇用形態で絞り込んで理想の職場を見つけましょう。",
};

type SearchParams = {
  category?: string;
  prefecture?: string;
  city?: string;
  employmentType?: string;
  keyword?: string;
  page?: string;
};

export default async function JobsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1") || 1);
  const { jobs, total, pageSize } = await fetchJobs({
    category: sp.category,
    prefecture: sp.prefecture,
    city: sp.city,
    employmentType: sp.employmentType,
    keyword: sp.keyword,
    page,
  });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function buildQuery(overrides: Partial<SearchParams>) {
    const merged = { ...sp, ...overrides };
    const qs = new URLSearchParams();
    if (merged.category) qs.set("category", merged.category);
    if (merged.prefecture) qs.set("prefecture", merged.prefecture);
    if (merged.city) qs.set("city", merged.city);
    if (merged.employmentType) qs.set("employmentType", merged.employmentType);
    if (merged.keyword) qs.set("keyword", merged.keyword);
    if (merged.page && merged.page !== "1") qs.set("page", merged.page);
    return `/jobs?${qs.toString()}`;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-black mb-6">求人を探す</h1>

      <form className="bg-white border border-slate-100 rounded-2xl p-4 mb-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <input
          name="keyword"
          defaultValue={sp.keyword}
          placeholder="キーワード"
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 sm:col-span-3 lg:col-span-1"
        />
        <select name="category" defaultValue={sp.category ?? ""} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="">職種を選択</option>
          {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select name="prefecture" defaultValue={sp.prefecture ?? ""} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="">都道府県を選択</option>
          {PREFECTURES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <CityMultiInput defaultValue={sp.city} />
        <select name="employmentType" defaultValue={sp.employmentType ?? ""} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="">雇用形態を選択</option>
          {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button type="submit" className="bg-brand-600 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-brand-700 transition sm:col-span-3 lg:col-span-5">
          検索する
        </button>
      </form>

      <p className="text-sm text-slate-500 mb-4">{total}件の求人が見つかりました</p>

      {jobs.length === 0 ? (
        <p className="text-slate-400 text-center py-20">条件に合う求人が見つかりませんでした。条件を変えて再度お試しください。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {jobs.map((job) => (
            <Link
              key={job.slug}
              href={`/jobs/${job.slug}`}
              className="block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-lg hover:border-brand-200 transition"
            >
              <span className="inline-block text-xs font-bold text-brand-700 bg-brand-50 rounded-full px-2.5 py-1 mb-3">
                {job.category || "求人"} ・ {job.employmentType || "雇用形態応相談"}
              </span>
              <h3 className="font-bold mb-2 leading-snug">{job.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{job.companyName}</p>
              <div className="text-sm text-slate-600 space-y-1">
                <p>{formatSalary(job.salaryMin, job.salaryMax, job.salary)}</p>
                <p>{job.prefecture}{job.city}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildQuery({ page: String(p) })}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium ${
                p === page ? "bg-brand-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-brand-400"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
