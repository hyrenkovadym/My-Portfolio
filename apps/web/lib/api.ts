import type { Category, Project } from "@/lib/types";

const defaultApiUrl = "http://localhost:3001";

function resolveApiUrl() {
  const raw = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? defaultApiUrl;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

async function fetchJson<T>(path: string, ttlSeconds = 60): Promise<T> {
  const response = await fetch(`${resolveApiUrl()}${path}`, {
    next: { revalidate: ttlSeconds },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await fetchJson<Category[]>("/categories", 300);
  } catch {
    return [];
  }
}

export async function getProjects(categorySlug?: string): Promise<Project[]> {
  const params = new URLSearchParams();

  if (categorySlug) {
    params.set("category", categorySlug);
  }

  const queryString = params.toString();
  const path = queryString ? `/products?${queryString}` : "/products";

  try {
    return await fetchJson<Project[]>(path, 60);
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await fetchJson<Project>(`/products/${slug}`, 60);
  } catch {
    return null;
  }
}
