/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Edit, Reply, Trash2 } from "lucide-react";
import { ReplyForm } from "./ReplyForm";
import { Comment } from "@/types/comment.type";
import { useAuth } from "@/hooks";
import CommentEditing from "./CommentEditing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";

interface CommentItemProps {
  readonly blogId: string;
  readonly comment: Comment;
  readonly isReply: boolean;
}

export default function CommentItem({
  comment,
  isReply,
  blogId
}: CommentItemProps) {
  const queryClient = useQueryClient();
  const [startEditing, setStartEditing] = useState(false);
  const [startReplying, setStartReplying] = useState(false);

  const { user } = useAuth();

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) =>
      fetchApi({
        url: API_ENDPOINTS.COMMENT.DELETE(commentId),
        method: "DELETE"
      })
  });

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        queryClient.refetchQueries([`comments-${blogId}`, blogId] as any);
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className={`flex gap-3`}>
      <Avatar className={`${isReply ? "h-8 w-8" : "h-10 w-10"}`}>
        <AvatarFallback className={`${isReply ? "text-xs" : "text-sm"}`}>
          {comment.user.name
            ?.split(" ")
            .map(n => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-gray-900">{comment.user.name}</span>
          <span className="text-sm text-gray-500">
            {formatDate(comment.createdAt)}
          </span>

          {user && user.email === comment.user.email && (
            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStartEditing(!!comment)}
                className="h-6 w-6 p-0"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(comment._id)}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {startEditing ? (
          <CommentEditing
            content={comment.content}
            commentId={comment._id}
            setStartEditing={setStartEditing}
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap ">
            {comment.content}
          </p>
        )}

        {/* Reply button for top-level comments */}
        {!startReplying && user && (
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStartReplying(true)}
              className="h-7 px-2 text-xs text-gray-400 hover:text-gray-800"
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>
        )}

        {/* Reply form */}
        {startReplying && (
          <ReplyForm
            blogId={blogId}
            parentCommentId={comment._id}
            onCancel={() => setStartReplying(false)}
            replyingTo={comment.user.name || "User"}
          />
        )}
      </div>
    </div>
  );
}
