export const JOB_CATEGORIES = ["看護師", "介護職", "その他"] as const;

export const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
] as const;

export const EMPLOYMENT_TYPES = ["正社員", "契約社員", "パート・アルバイト", "派遣社員", "業務委託"] as const;

// 現時点ではCRM上に非公開求人として個別データ化されていない、実業務ベースの件数。
// CRM側に件数管理機能を追加でき次第、API経由の動的取得に切り替える。
export const PRIVATE_JOBS_COUNT = 800;

export function formatSalary(min: number | null, max: number | null, fallback: string): string {
  if (min && max) return `月給${(min / 10000).toFixed(0)}万円〜${(max / 10000).toFixed(0)}万円`;
  if (min) return `月給${(min / 10000).toFixed(0)}万円〜`;
  return fallback || "応相談";
}
