import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchJobs } from "@/lib/api";
import { formatSalary, JOB_CATEGORIES, PREFECTURES, EMPLOYMENT_TYPES } from "@/lib/constants";
import { Reveal } from "./components/Reveal";

export const metadata: Metadata = {
  title: "Recrive｜想像以上の仕事に出会おう。医療・介護の求人サイト",
  description:
    "看護師・介護士など医療・介護業界の求人を探すならRecrive。給与や勤務地だけではなく、あなたの「こう働きたい」から、自分に合った仕事を探せます。求人検索・応募・キャリア相談まで無料で利用できます。",
};

const STRENGTHS = [
  {
    no: "01",
    title: "医療・介護に特化",
    desc: "看護師・介護職をはじめ、医療・介護業界の求人に特化。業界を知っているからこそ、あなたの経験や希望に合った仕事探しをサポートできます。",
    icon: (
      <path d="M12 4.5c-1.7-2-4.6-2.3-6.5-.6-2 1.8-2.1 4.9-.2 6.8L12 18l6.7-7.3c1.9-1.9 1.8-5-.2-6.8-1.9-1.7-4.8-1.4-6.5.6Z" />
    ),
  },
  {
    no: "02",
    title: "気になる求人に、すぐ応募",
    desc: "「この求人、気になる。」そう思ったら、その場ですぐ応募できます。面倒な会員登録は不要。気軽に仕事探しを始められます。",
    icon: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />,
  },
  {
    no: "03",
    title: "利用料は完全無料",
    desc: "求職者の方の利用料は0円。求人への応募からキャリア相談まで、費用は一切かかりません。",
    icon: <path d="M12 2v20M8 6h6.5a2.5 2.5 0 0 1 0 5H9.5a2.5 2.5 0 0 0 0 5H16" />,
  },
  {
    no: "04",
    title: "キャリアアドバイザーが伴走",
    desc: "「どの求人が自分に合うかわからない」「今の職場を辞めるべきかわからない」そんな悩みも大丈夫。アドバイザーが転職活動をサポートします。",
    icon: <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M15 3.3a4 4 0 0 1 0 7.4M21 20v-1a4 4 0 0 0-3-3.9M11 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
  },
];

const VISION_STEPS = [
  { no: "01", label: "これまで", desc: "何を大切に働いてきた？" },
  { no: "02", label: "これから", desc: "どんな働き方をしたい？" },
  { no: "03", label: "未来", desc: "どんな自分になりたい？" },
];

const VALUE_STEPS = [
  { no: "01", when: "これまで", question: "何を大切に働いてきた？", desc: "これまでの経験やキャリアを整理する。" },
  { no: "02", when: "これから", question: "どんな働き方をしたい？", desc: "理想の働き方や、これから挑戦したいことを考える。" },
  { no: "03", when: "そして", question: "どんな未来をつくりたい？", desc: "仕事だけではなく、人生そのものを考えた仕事選びへ。" },
];

function PrimaryCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/jobs"
      className={`inline-block text-center bg-brand-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-brand-700 transition ${className}`}
    >
      求人を探す
    </Link>
  );
}

function SecondaryCta({ label = "キャリアについて無料相談する", className = "" }: { label?: string; className?: string }) {
  return (
    <Link
      href="/consult"
      className={`inline-block text-center border-2 border-brand-600 text-brand-600 font-bold px-8 py-4 rounded-full hover:bg-brand-50 transition bg-white ${className}`}
    >
      {label}
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-center text-brand-600 font-bold tracking-[0.2em] text-xs uppercase mb-3">{children}</p>;
}

export default async function HomePage() {
  const { jobs: featuredJobs } = await fetchJobs({ page: 1 });

  return (
    <div>
      {/* 01 ファーストビュー */}
      <Image
        src="/hero-banner.png"
        alt="医療・福祉に、笑顔をつなぐ。Recrive"
        width={1536}
        height={1024}
        priority
        className="w-full h-auto"
      />

      {/* 02 共感セクション */}
      <Reveal className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center block">
        <Eyebrow>About Recrive</Eyebrow>
        <h2 className="text-xl sm:text-3xl font-black mb-8 leading-relaxed">
          「条件がいい」だけで、<br className="sm:hidden" />本当にいい仕事ですか？
        </h2>
        <div className="text-slate-500 leading-loose text-sm sm:text-base space-y-1">
          <p>給与が高い。休みが多い。家から近い。</p>
          <p>もちろん、それも大切。</p>
          <p className="pt-2 font-bold text-slate-700">
            でも、本当に大切なのは、<br className="sm:hidden" />
            「この場所で、これからも働きたい」と思えること。
          </p>
          <p className="pt-2">
            Recriveは、求人票に書かれた条件だけでは見えない<br className="hidden sm:block" />
            あなた自身の「想い」や「価値観」まで大切にします。
          </p>
        </div>
      </Reveal>

      {/* 03 Recriveのコンセプト (Vision) */}
      <section id="vision" className="bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[57%_43%] gap-10 lg:gap-16 lg:items-center lg:min-h-[680px]">
            <Reveal className="block">
              <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[28px] overflow-hidden">
                <Image
                  src="/vision-nurses.jpg"
                  alt="青空の下で笑顔を見せる3人の医療従事者"
                  fill
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "58% 38%" }}
                />
              </div>
            </Reveal>

            <div>
              <Reveal className="block">
                <p className="text-brand-600 font-bold tracking-[0.2em] text-xs uppercase mb-4">Our Vision</p>
                <h2 className="text-2xl sm:text-4xl font-black leading-snug mb-8 sm:mb-10">
                  条件だけじゃない。<br />「想い」で選ぶ。
                </h2>
                <div className="space-y-3 text-slate-500 text-sm sm:text-base leading-loose max-w-[480px] mb-14 sm:mb-16">
                  <p>給与や勤務地だけでは、あなたに合う仕事は決められない。</p>
                  <p>
                    これまで何を大切に働いてきたのか。<br />
                    これからどんな働き方をしたいのか。<br />
                    そして、どんな未来をつくりたいのか。
                  </p>
                  <p className="font-bold text-slate-700">
                    Recriveは、求人票だけでは見えないあなたの「想い」まで大切にします。
                  </p>
                </div>
              </Reveal>

              <Reveal className="block relative">
                <div className="hidden sm:block absolute top-[22px] left-[7%] right-[7%] h-px bg-brand-200" />
                <div className="relative grid grid-cols-3 gap-3 sm:gap-6">
                  {VISION_STEPS.map((s) => (
                    <div key={s.no}>
                      <p className="relative z-10 inline-block bg-white pr-3 sm:pr-4 text-3xl sm:text-4xl font-black text-brand-200">{s.no}</p>
                      <p className="text-sm font-bold text-slate-700 mt-2">{s.label}</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 04 求人検索 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-8">
          <Eyebrow>Find Your Job</Eyebrow>
          <h2 className="text-xl sm:text-3xl font-black">あなたは、どんな働き方がしたい？</h2>
        </div>

        <form action="/jobs" className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-3 flex flex-col sm:flex-row gap-2 mb-5">
          <select name="category" defaultValue="" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
            <option value="">職種</option>
            {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select name="prefecture" defaultValue="" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
            <option value="">勤務地</option>
            {PREFECTURES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select name="employmentType" defaultValue="" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
            <option value="">働き方</option>
            {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button type="submit" className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition whitespace-nowrap">
            求人を探す
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/jobs?category=看護師" className="text-sm bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:border-brand-400 hover:text-brand-600 transition">
            看護師の求人
          </Link>
          <Link href="/jobs?category=介護職" className="text-sm bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:border-brand-400 hover:text-brand-600 transition">
            介護職の求人
          </Link>
          <Link href="/jobs?category=その他" className="text-sm bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:border-brand-400 hover:text-brand-600 transition">
            その他の医療・介護求人
          </Link>
        </div>
      </section>

      {/* 05 Recriveの強み */}
      <section className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-10">
            <Eyebrow>Why Recrive?</Eyebrow>
            <h2 className="text-xl sm:text-3xl font-black">Recriveだからできること。</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {STRENGTHS.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-black text-brand-300">{f.no}</span>
                  <svg className="w-7 h-7 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 価値観から仕事を選ぶ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <Eyebrow>Driven by Values</Eyebrow>
          <h2 className="text-xl sm:text-3xl font-black">
            条件だけじゃない。<br className="sm:hidden" />「想い」で選ぶ。
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {VALUE_STEPS.map((s, i) => (
            <Reveal key={s.no} className="relative text-center px-2 block">
              <p className="text-4xl font-black text-brand-100 mb-2">{s.no}</p>
              <p className="text-xs font-bold text-brand-600 tracking-widest uppercase mb-2">{s.when}</p>
              <h3 className="font-bold text-base mb-2">{s.question}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              {i < VALUE_STEPS.length - 1 && (
                <span className="hidden sm:block absolute top-6 -right-2 text-brand-200 text-xl">→</span>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* 07 新着求人 */}
      <section className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-10">
            <Eyebrow>New Jobs</Eyebrow>
            <h2 className="text-xl sm:text-3xl font-black">あなたの「気になる」を見つけよう。</h2>
          </div>
          {featuredJobs.length === 0 ? (
            <p className="text-slate-400 text-center py-12">現在公開中の求人はありません。</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {featuredJobs.slice(0, 6).map((job) => (
                <Link
                  key={job.slug}
                  href={`/jobs/${job.slug}`}
                  className="block bg-white rounded-2xl p-5 hover:shadow-lg hover:border-brand-200 border border-slate-100 transition"
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
          <div className="text-center">
            <Link href="/jobs" className="text-sm text-brand-600 font-bold hover:underline">すべての求人を見る →</Link>
          </div>
        </div>
      </section>

      {/* 08 転職を迷っている人向け */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Eyebrow>For You</Eyebrow>
        <h2 className="text-xl sm:text-3xl font-black mb-8 leading-relaxed">
          まだ、転職すると<br className="sm:hidden" />決めていなくても大丈夫。
        </h2>
        <div className="text-slate-500 leading-loose text-sm sm:text-base mb-8 space-y-1">
          <p>「今の職場に不満はあるけど、辞めるほどではない。」</p>
          <p>「転職した方がいいのか、まだわからない。」</p>
          <p>「自分にどんな仕事が合うのかわからない。」</p>
          <p className="pt-2 font-bold text-slate-700">
            そんな状態でも大丈夫です。<br />
            Recriveでは、情報収集だけのご相談も無料で受け付けています。
          </p>
        </div>
        <SecondaryCta label="まずはキャリアについて相談する" />
        <p className="text-xs text-slate-400 mt-4">相談無料｜無理な転職の勧誘はありません</p>
      </section>

      {/* 09 キャリア相談 */}
      <section className="bg-brand-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Eyebrow>Career Support</Eyebrow>
          <h2 className="text-xl sm:text-3xl font-black mb-8 leading-relaxed">
            あなたのキャリアに、<br className="sm:hidden" />一緒に向き合う。
          </h2>
          <p className="text-slate-500 leading-loose text-sm sm:text-base mb-8">
            Recriveでは求人を紹介するだけではありません。
            あなたのこれまでの経験や希望を整理し、
            「なぜ転職したいのか」「何を変えたいのか」「どんな未来を実現したいのか」を一緒に考えます。
            そして、その答えに合った求人を探していきます。
          </p>
          <Link
            href="/consult"
            className="inline-block text-center bg-brand-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-brand-700 transition"
          >
            無料でキャリア相談する
          </Link>
        </div>
      </section>

      {/* 10 最終CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
        <h2 className="text-xl sm:text-2xl font-black mb-8 leading-relaxed">
          あなたの未来は、<br className="sm:hidden" />まだ決まっていない。
        </h2>
        <div className="text-slate-500 leading-loose text-sm sm:text-base mb-10 space-y-1">
          <p>仕事を変えれば、働き方が変わる。</p>
          <p>働き方が変われば、人生が変わる。</p>
          <p className="pt-2">だからこそ、次の仕事は妥協して選んでほしくない。</p>
        </div>
        <h3 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">想像以上の仕事に出会おう。</h3>
        <p className="text-slate-500 mb-10">
          あなたの「こう働きたい」から探す、<br className="sm:hidden" />
          医療・介護の求人サイト。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <PrimaryCta className="w-full sm:w-auto" />
          <SecondaryCta className="w-full sm:w-auto" />
        </div>
      </section>
    </div>
  );
}
