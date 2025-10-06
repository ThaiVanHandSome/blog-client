/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

type FetchOptions<T> = {
  url: string;
  method?: string;
  body?: T;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number | false; // cho next: { revalidate };
  includeCookies?: boolean;
};

export async function fetchApiServer<T>({
  url,
  method = "GET",
  body,
  headers = {},
  cache,
  revalidate,
  includeCookies = true
}: FetchOptions<T>): Promise<T> {
  try {
    const isFormData = body instanceof FormData;
    const cookieHeader = includeCookies ? (await cookies()).toString() : "";

    const res = await fetch(url, {
      method,
      headers: {
        ...(includeCookies && { Cookie: cookieHeader }),
        ...(isFormData
          ? headers
          : { "Content-Type": "application/json", ...headers })
      },
      body: body
        ? isFormData
          ? (body as any)
          : JSON.stringify(body)
        : undefined,
      ...(cache ? { cache } : {}),
      ...(revalidate !== undefined ? { next: { revalidate } } : {})
    });

    const data = res.headers.get("content-type")?.includes("application/json")
      ? await res.json()
      : await res.text();

    if (!res.ok)
      throw new Error((data as any)?.message ?? `HTTP ${res.status}`);

    return data as T;
  } catch (error) {
    console.error("❌ [fetchApiServer] Error:", error);
    throw new Error((error as any)?.message);
    return null as T;
  }
}
