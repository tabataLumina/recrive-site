const CRM_API_BASE_URL = process.env.CRM_API_BASE_URL ?? "http://localhost:3000";

export type JobSummary = {
  slug: string;
  title: string;
  category: string;
  employmentType: string;
  salary: string;
  salaryMin: number | null;
  salaryMax: number | null;
  prefecture: string;
  city: string;
  location: string;
  imageUrls: string;
  companyName: string;
  companyLogoUrl: string;
  publishedAt: string;
};

export type JobDetail = JobSummary & {
  jobType: string;
  workHours: string;
  description: string;
  appealPoints: string;
  company: {
    name: string;
    logoUrl: string;
    publicDescription: string;
    prefecture: string;
    address: string;
  };
};

export type JobSearchParams = {
  category?: string;
  prefecture?: string;
  city?: string;
  employmentType?: string;
  keyword?: string;
  page?: number;
};

export async function fetchJobs(params: JobSearchParams): Promise<{ jobs: JobSummary[]; total: number; page: number; pageSize: number }> {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", params.category);
  if (params.prefecture) qs.set("prefecture", params.prefecture);
  if (params.city) qs.set("city", params.city);
  if (params.employmentType) qs.set("employmentType", params.employmentType);
  if (params.keyword) qs.set("keyword", params.keyword);
  if (params.page) qs.set("page", String(params.page));

  const res = await fetch(`${CRM_API_BASE_URL}/api/public/jobs?${qs.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) return { jobs: [], total: 0, page: 1, pageSize: 20 };
  return res.json();
}

export async function fetchJobDetail(slug: string): Promise<JobDetail | null> {
  const res = await fetch(`${CRM_API_BASE_URL}/api/public/jobs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export type ApplyPayload = {
  jobSlug: string;
  lastName: string;
  firstName: string;
  lastNameKana?: string;
  firstNameKana?: string;
  birthDate?: string;
  gender?: string;
  postalCode?: string;
  prefecture?: string;
  address?: string;
  phone: string;
  email?: string;
  qualifications?: string;
  message?: string;
};

export async function submitApplication(payload: ApplyPayload): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${CRM_API_BASE_URL}/api/public/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) return { success: false, error: data.error ?? "応募に失敗しました" };
  return { success: true };
}

export type ConsultPayload = {
  jobSlug?: string;
  lastName: string;
  firstName: string;
  lastNameKana?: string;
  firstNameKana?: string;
  gender?: string;
  prefecture?: string;
  phone: string;
  email?: string;
  qualifications?: string;
  desiredCategory?: string;
  desiredArea?: string;
  message?: string;
};

export async function submitConsult(payload: ConsultPayload): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${CRM_API_BASE_URL}/api/public/consult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) return { success: false, error: data.error ?? "送信に失敗しました" };
  return { success: true };
}
