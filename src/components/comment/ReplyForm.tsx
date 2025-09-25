/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { API_ENDPOINTS } from "@/constants/api";
import { ReplyRequest } from "@/types/comment.type";
import { CommentInput, commentSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/utils/fetchApi";
import FormTextarea from "../form/FormTextArea";
import LoadingButton from "../LoadingButton";
import { MessageSquare, X } from "lucide-react";

interface ReplyFormProps {
  blogId: string;
  parentCommentId: string;
  onCancel: () => void;
  replyingTo: string;
}

const DEFAULT_VALUES: CommentInput = {
  content: ""
};

export function ReplyForm({
  blogId,
  parentCommentId,
  onCancel,
  replyingTo
}: ReplyFormProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { control, handleSubmit, watch, setValue } = useForm<CommentInput>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(commentSchema)
  });

  const content = watch("content");

  const createReplyMutation = useMutation({
    mutationFn: (body: ReplyRequest) =>
      fetchApi({
        url: API_ENDPOINTS.COMMENT.CREATE,
        method: "POST",
        body
      })
  });

  const onSubmit = handleSubmit((data: CommentInput) => {
    const replyRequest: ReplyRequest = {
      content: data.content,
      blog: blogId,
      parent_comment: parentCommentId
    };

    createReplyMutation.mutate(replyRequest, {
      onSuccess: () => {
        setValue("content", "");
        onCancel();
        queryClient.refetchQueries([`comments-${blogId}`, blogId] as any);
      }
    });
  });

  const initials = user?.name
    ?.split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="ml-12 mt-4 border-l-2 border-gray-200 pl-4">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          Replying to <span className="font-medium">{replyingTo}</span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-6 w-6 p-0 ml-auto"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <FormTextarea
              control={control}
              name="content"
              placeholder="Write your reply..."
              className="min-h-[80px]"
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {content.length}/1000 characters
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  type="button"
                >
                  Cancel
                </Button>
                <LoadingButton
                  disabled={content.length === 0}
                  isLoading={createReplyMutation.isPending}
                  loadingText="Posting..."
                  size="sm"
                >
                  Reply
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

