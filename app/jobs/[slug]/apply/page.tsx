import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchJobDetail } from "@/lib/api";
import { ApplyForm } from "./ApplyForm";

export const metadata: Metadata = { title: "求人へ応募する" };

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await fetchJobDetail(slug);
  if (!job) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-brand-50 rounded-2xl p-5 mb-8">
        <p className="text-xs text-brand-600 font-bold mb-1">応募する求人</p>
        <h1 className="font-bold text-lg">{job.title}</h1>
        <p className="text-sm text-slate-500">{job.company.name}</p>
      </div>

      <ApplyForm jobSlug={slug} />
    </div>
  );
}
