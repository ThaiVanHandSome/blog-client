/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from "next/dist/server/api-utils";
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
  cache = "no-store",
  revalidate,
  includeCookies = true
}: FetchOptions<T>): Promise<T> {
  try {
    const isFormData = body instanceof FormData;
    const cookieHeader = includeCookies ? (await cookies()).toString() : "";
    const res = await fetch(url, {
      method,
      headers: {
        Cookie: cookieHeader,
        ...(isFormData
          ? headers // nếu là FormData thì không set Content-Type
          : {
              "Content-Type": "application/json",
              ...headers
            })
      },
      body: body
        ? isFormData
          ? (body as any)
          : JSON.stringify(body)
        : undefined,
      cache,
      next: revalidate !== undefined ? { revalidate } : undefined
    });

    const contentType = res.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await res.json()
      : await res.text();

    if (!res.ok) {
      const message =
        (data as any)?.message || `Request failed with status ${res.status}`;
      throw new ApiError(res.status, message);
    }

    return data as T;
  } catch (error) {
    console.error("❌ [fetchApiServer] Error:", error);
    if (error instanceof TypeError && error.message === "fetch failed") {
      throw new Error("Network error: Failed to connect to server");
    }
    throw error;
  }
}
