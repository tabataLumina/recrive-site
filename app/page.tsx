import Link from "next/link";
import { fetchJobs } from "@/lib/api";
import { formatSalary } from "@/lib/constants";

const STRENGTHS = [
  {
    title: "医療・介護に特化",
    desc: "看護師・介護職に絞ることで、現場を深く理解したご提案ができます。",
    icon: (
      <path d="M12 4.5c-1.7-2-4.6-2.3-6.5-.6-2 1.8-2.1 4.9-.2 6.8L12 18l6.7-7.3c1.9-1.9 1.8-5-.2-6.8-1.9-1.7-4.8-1.4-6.5.6Z" />
    ),
  },
  {
    title: "その場で直接応募",
    desc: "気になる求人ページからすぐに応募可能。面倒な会員登録は不要です。",
    icon: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />,
  },
  {
    title: "ご利用は完全無料",
    desc: "施設様から紹介料をいただく仕組みのため、費用は一切かかりません。",
    icon: <path d="M12 2v20M8 6h6.5a2.5 2.5 0 0 1 0 5H9.5a2.5 2.5 0 0 0 0 5H16" />,
  },
  {
    title: "専任アドバイザーが伴走",
    desc: "応募後は専任のキャリアアドバイザーが転職活動をしっかりサポートします。",
    icon: <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M15 3.3a4 4 0 0 1 0 7.4M21 20v-1a4 4 0 0 0-3-3.9M11 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
  },
];

export default async function HomePage() {
  const { jobs: featuredJobs } = await fetchJobs({ page: 1 });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/60 to-white">
        <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gold-400/40 blur-2xl" />
        <div className="pointer-events-none absolute top-40 -left-24 w-64 h-64 rounded-full bg-brand-200/50 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <p className="text-brand-600 font-bold tracking-[0.2em] text-xs sm:text-sm mb-4 uppercase">Care meets Career</p>
          <p className="font-serif italic text-3xl sm:text-5xl text-brand-700/90 tracking-tight mb-3">
            Find where you belong.
          </p>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-6 leading-snug">
            あなたの想いに、<br className="sm:hidden" />いちばん近い仕事を。
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto mb-10">
            Recriveは看護師・介護職に特化した求人サイトです。気になる求人を見つけたら、その場ですぐに応募できます。
          </p>

          <form action="/jobs" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-3 flex flex-col sm:flex-row gap-2">
            <input
              name="keyword"
              placeholder="キーワード（例: 訪問看護、正社員 など）"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button type="submit" className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition">
              求人を探す
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["看護師", "介護職"].map((c) => (
              <Link
                key={c}
                href={`/jobs?category=${encodeURIComponent(c)}`}
                className="text-sm bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:border-brand-400 hover:text-brand-600 transition"
              >
                {c}の求人
              </Link>
            ))}
            <Link
              href="/consult"
              className="text-sm bg-brand-600 text-white rounded-full px-4 py-1.5 hover:bg-brand-700 transition"
            >
              まずは相談する
            </Link>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-center text-brand-600 font-bold tracking-widest text-xs uppercase mb-2">Strength</p>
        <h2 className="text-center text-xl sm:text-2xl font-black mb-10">Recriveの強み</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STRENGTHS.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 text-center">
              <svg className="w-9 h-9 mx-auto mb-4 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {f.icon}
              </svg>
              <h3 className="font-bold text-sm sm:text-base mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-brand-600 font-bold tracking-widest text-xs uppercase mb-3">Driven by Values</p>
          <h2 className="text-xl sm:text-3xl font-black mb-6 leading-relaxed">
            条件だけでなく、<br className="sm:hidden" />想いに寄り添う。
          </h2>
          <p className="text-slate-500 leading-loose text-sm sm:text-base">
            給与や勤務地といった条件だけで職場を選ぶと、長く続く出会いにはなりません。
            Recriveでは、これまで積み重ねてきたキャリアや大切にしたい働き方、
            これから叶えたい想いにまで向き合い、本当に合う職場探しをサポートします。
          </p>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">新着求人</h2>
          <Link href="/jobs" className="text-sm text-brand-600 font-medium hover:underline">すべての求人を見る →</Link>
        </div>
        {featuredJobs.length === 0 ? (
          <p className="text-slate-400 text-center py-12">現在公開中の求人はありません。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredJobs.slice(0, 6).map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                className="block bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-lg hover:border-brand-200 transition"
              >
                <span className="inline-block text-xs font-bold text-brand-700 bg-brand-50 rounded-full px-2.5 py-1 mb-3">
                  {job.category || "求人"}
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
      </section>

      {/* Reassurance / Consult CTA */}
      <section className="bg-brand-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-xl sm:text-2xl font-black mb-8">安心してご利用いただけます</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6">
              <p className="font-bold text-slate-800 mb-3">ご利用は完全無料</p>
              <p className="text-3xl font-black text-brand-600 mb-3">¥0</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                医療・介護施設様から紹介料をいただく仕組みのため、求職者の方の費用は一切かかりません。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <p className="font-bold text-slate-800 mb-3">今すぐ転職しない方もOK</p>
              <svg className="w-10 h-10 mx-auto mb-3 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                <path d="M15 15v1a2 2 0 0 1-2 2h-4l-3 2v-2h-1a2 2 0 0 1-2-2v-4" opacity="0.5" />
              </svg>
              <p className="text-sm text-slate-500 leading-relaxed">
                情報収集だけのご相談でも大歓迎です。まずはお気軽にお話しください。
              </p>
            </div>
          </div>

          <Link
            href="/consult"
            className="inline-block bg-brand-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-brand-700 transition"
          >
            Recriveに無料相談する
          </Link>
        </div>
      </section>
    </div>
  );
}
