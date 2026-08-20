"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HIDE_ON_PREFIXES = ["/consult", "/jobs/"];

export function FloatingConsultBar() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [pastHero, setPastHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setPastHero(true);
      return;
    }
    setPastHero(false);
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  if (HIDE_ON_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const visible = pastHero && !dismissed;

  return (
    <div
      className={`fixed bottom-4 inset-x-0 z-30 px-4 sm:px-6 transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="max-w-xl mx-auto bg-white border border-brand-100 rounded-2xl shadow-xl p-4 sm:p-5 flex items-center gap-4">
        <p className="flex-1 text-sm text-slate-600 text-left">
          まだ求人を決めていない方も大丈夫。<br className="hidden sm:block" />
          キャリアアドバイザーに無料で相談できます。
        </p>
        <Link
          href="/consult"
          className="shrink-0 border-2 border-brand-600 text-brand-600 font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-brand-50 transition whitespace-nowrap text-sm sm:text-base bg-white"
        >
          無料相談する
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="閉じる"
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-slate-300 hover:bg-slate-100 hover:text-slate-500 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}
