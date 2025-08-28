"use client";

import { API_ENDPOINTS } from "@/constants/api";
import { Comment } from "@/types/comment.type";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/utils/fetchApi";
import CommentItem from "./CommentItem";

interface CommentListProps {
  blogId: string;
}

export function CommentList({ blogId }: CommentListProps) {
  const { data, isLoading } = useQuery({
    queryKey: [`comments-${blogId}`, blogId],
    queryFn: () =>
      fetchApi<{ data: Comment[] }>({
        url: API_ENDPOINTS.COMMENT.GET_BY_BLOG(blogId),
        method: "GET",
        showToastWhenSuccess: false
      })
  });

  const comments = data?.data || [];

  // Render a single comment (can be top-level or reply)
  const renderComment = (comment: Comment, isReply = false) => {
    const replies = comment.replies ?? [];
    const hasReplies = replies.length > 0;

    return (
      <div key={comment._id} className={`${isReply ? "mt-2" : ""}`}>
        <CommentItem comment={comment} isReply={isReply} blogId={blogId} />

        <div className="ml-12 border-l px-4 border-l-gray-200">
          {hasReplies && replies.map(comment => renderComment(comment, true))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment: Comment) => renderComment(comment))}
        </div>
      )}
    </div>
  );
}
