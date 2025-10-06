"use client";

import { useEffect, useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { API_ENDPOINTS } from "@/constants/api";
import { fetchApi } from "@/utils/fetchApi";
import { DataResponse } from "@/types/http.type";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

type LikeButtonProps = {
  blogId: string;
  initialLikes: number;
};

export default function LikeButton({ blogId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  async function handleLike() {
    if (isPending) return;
    if (!isAuthenticated) return router.push("/auth/login");
    const optimisticLikes = liked ? likes - 1 : likes + 1;
    setLiked(v => !v);
    setLikes(optimisticLikes);

    try {
      const res = await fetchApi<DataResponse<number>>({
        url: API_ENDPOINTS.BLOG.TOGGLE_LIKE(blogId),
        method: "POST",
        showToastWhenSuccess: false
      });
      if (res?.data !== undefined) {
        setLikes(res.data);
      }
    } catch {
      // revert on error
      setLiked(v => !v);
      setLikes(v => (liked ? v + 1 : v - 1));
    }
  }

  useEffect(() => {
    async function checkLiked(blogId: string) {
      const data = await fetchApi<DataResponse<boolean>>({
        url: API_ENDPOINTS.LIKE.CHECK_LIKED(blogId),
        method: "GET"
      });
      setLiked(data.data);
    }
    checkLiked(blogId);
  }, [blogId]);

  return (
    <button
      type="button"
      onClick={() => startTransition(handleLike)}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
        liked
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      } disabled:opacity-50`}
      disabled={isPending}
      aria-pressed={liked}
    >
      <Heart
        className={`h-4 w-4 ${
          liked ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
      <span>{likes}</span>
    </button>
  );
}
