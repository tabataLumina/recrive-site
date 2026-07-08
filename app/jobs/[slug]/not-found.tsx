import Link from "next/link";

export default function JobNotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
      <h1 className="text-2xl font-black mb-3">求人が見つかりませんでした</h1>
      <p className="text-slate-500 mb-8">この求人は募集を終了しているか、URLが間違っている可能性があります。</p>
      <Link href="/jobs" className="inline-block bg-brand-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-brand-700 transition">
        求人一覧へ戻る
      </Link>
    </div>
  );
}
