"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

type FetchOptions<T> = {
  url: string;
  method?: string;
  body?: T;
  headers?: Record<string, string>;
  cache?: RequestCache;
};

export async function fetchApi<T>({
  url,
  method = "GET",
  body,
  headers = {},
  cache,
}: FetchOptions<T>): Promise<T> {
  try {
    const isFormData = body instanceof FormData;

    const res = await fetch(url, {
      method,
      headers: isFormData
        ? headers // FormData → avoid losing boundary
        : {
            "Content-Type": "application/json",
            ...headers,
          },
      credentials: "include",
      body: body
        ? isFormData
          ? (body as any)
          : JSON.stringify(body)
        : undefined,
      cache,
    });

    const data = await res.json();
    const message = data.message;

    if (!res.ok) {
      toast.error(message || "Something went wrong");
      throw new ApiError(res.status, message || "Unknown error");
    }

    if (message) {
      toast.success(message);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      toast.error("Network error: Please check your connection");
    }
    throw error;
  }
}
