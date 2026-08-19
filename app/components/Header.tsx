"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Recrive" width={561} height={192} className="h-8 sm:h-9 w-auto" priority />
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link href="/jobs" className="text-slate-600 hover:text-brand-600 transition">求人を探す</Link>
          <Link href="/#vision" className="text-slate-600 hover:text-brand-600 transition">Recriveについて</Link>
          <Link href="/consult" className="text-slate-600 hover:text-brand-600 transition">キャリア相談</Link>
          <Link
            href="/consult"
            className="bg-brand-600 text-white px-4 py-2 rounded-full hover:bg-brand-700 transition whitespace-nowrap"
          >
            無料で相談する
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="メニュー"
          aria-expanded={open}
          className="sm:hidden w-11 h-11 -mr-2 flex items-center justify-center text-slate-700"
        >
          {open ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="sm:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-1 text-sm font-medium">
          <Link href="/jobs" onClick={() => setOpen(false)} className="py-3 text-slate-700">求人を探す</Link>
          <Link href="/#vision" onClick={() => setOpen(false)} className="py-3 text-slate-700">Recriveについて</Link>
          <Link href="/consult" onClick={() => setOpen(false)} className="py-3 text-slate-700">キャリア相談</Link>
          <Link
            href="/consult"
            onClick={() => setOpen(false)}
            className="mt-2 bg-brand-600 text-white text-center px-4 py-3 rounded-full hover:bg-brand-700 transition"
          >
            無料で相談する
          </Link>
        </nav>
      )}
    </header>
  );
}
