import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchJobDetail } from "@/lib/api";
import { formatSalary } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await fetchJobDetail(slug);
  if (!job) return { title: "求人が見つかりません" };
  const title = `${job.title}｜${job.company.name}の求人`;
  const description = `${job.company.name}（${job.prefecture}${job.city}）の${job.category}求人。${formatSalary(job.salaryMin, job.salaryMax, job.salary)}。Recriveから直接応募できます。`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await fetchJobDetail(slug);
  if (!job) notFound();

  const appealPoints = job.appealPoints.split("\n").map((s) => s.trim()).filter(Boolean);
  const jobPostingLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.title,
    datePosted: job.publishedAt,
    employmentType: job.employmentType || undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: job.prefecture,
        addressLocality: job.city,
        streetAddress: job.company.address,
        addressCountry: "JP",
      },
    },
    baseSalary: job.salaryMin
      ? {
          "@type": "MonetaryAmount",
          currency: "JPY",
          value: { "@type": "QuantitativeValue", minValue: job.salaryMin, maxValue: job.salaryMax ?? job.salaryMin, unitText: "MONTH" },
        }
      : undefined,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }} />

      <nav className="text-xs text-slate-400 mb-4">
        <Link href="/jobs" className="hover:underline">求人検索</Link> / {job.category}
      </nav>

      <span className="inline-block text-xs font-bold text-brand-700 bg-brand-50 rounded-full px-2.5 py-1 mb-3">
        {job.category} ・ {job.employmentType || "雇用形態応相談"}
      </span>
      <h1 className="text-2xl sm:text-3xl font-black mb-2 leading-snug">{job.title}</h1>
      <p className="text-slate-500 mb-6">{job.company.name} / {job.prefecture}{job.city}</p>

      {appealPoints.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {appealPoints.map((p) => (
            <span key={p} className="text-sm bg-amber-50 text-amber-700 font-medium rounded-full px-3 py-1">✓ {p}</span>
          ))}
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden mb-8">
        <dl className="divide-y divide-slate-100 text-sm">
          {[
            ["給与", formatSalary(job.salaryMin, job.salaryMax, job.salary)],
            ["勤務地", job.location || `${job.prefecture}${job.city}`],
            ["勤務時間", job.workHours || "応相談"],
            ["雇用形態", job.employmentType || "応相談"],
            ["職種", job.jobType || job.category],
          ].map(([label, value]) => (
            <div key={label} className="flex px-5 py-3">
              <dt className="w-28 shrink-0 text-slate-400 font-medium">{label}</dt>
              <dd className="text-slate-800">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {job.description && (
        <div className="mb-8">
          <h2 className="font-bold text-lg mb-3">仕事内容</h2>
          <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
        </div>
      )}

      {job.company.publicDescription && (
        <div className="mb-10 bg-slate-50 rounded-2xl p-5">
          <h2 className="font-bold text-lg mb-2">{job.company.name}について</h2>
          <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{job.company.publicDescription}</p>
        </div>
      )}

      <div className="sticky bottom-4 flex flex-col sm:flex-row gap-3">
        <Link
          href={`/jobs/${job.slug}/apply`}
          className="flex-1 text-center bg-brand-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-brand-700 transition"
        >
          この求人に応募する
        </Link>
        <Link
          href={`/consult?job=${job.slug}`}
          className="flex-1 text-center bg-white border-2 border-brand-600 text-brand-600 font-bold py-4 rounded-2xl shadow-lg hover:bg-brand-50 transition"
        >
          まずは相談する
        </Link>
      </div>
    </div>
  );
}
