import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { FloatingConsultBar } from "./components/FloatingConsultBar";
import { Header } from "./components/Header";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Recrive（リクライブ）| 医療・介護の求人サイト",
    template: "%s | Recrive",
  },
  description:
    "Recriveは医療・介護業界に特化した求人サイトです。看護師・介護職の求人を多数掲載。気になる求人にそのまま応募できます。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-slate-900">
        <Header />

        <main className="flex-1 pb-28">{children}</main>

        <FloatingConsultBar />

        <footer className="border-t border-slate-100 bg-slate-50 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-slate-500">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
              <div>
                <Image src="/logo.png" alt="Recrive" width={561} height={192} className="h-8 w-auto mb-3" />
                <p>医療・介護に特化した求人紹介サービス</p>
                <p className="mt-1">運営: 株式会社Lumina</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="font-semibold text-slate-700 mb-2">求人を探す</p>
                  <ul className="space-y-1">
                    <li><Link href="/jobs?category=看護師" className="hover:text-brand-600">看護師の求人</Link></li>
                    <li><Link href="/jobs?category=介護職" className="hover:text-brand-600">介護職の求人</Link></li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-700 mb-2">サポート</p>
                  <ul className="space-y-1">
                    <li><Link href="/consult" className="hover:text-brand-600">キャリア相談（無料）</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} Lumina Inc. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
