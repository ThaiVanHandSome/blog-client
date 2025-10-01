/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { API_ENDPOINTS } from "@/constants/api";
import { CreateCommentRequest } from "@/types/comment.type";
import { CommentInput, commentSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/utils/fetchApi";
import FormTextarea from "../form/FormTextArea";
import LoadingButton from "../LoadingButton";

interface CommentFormProps {
  blogId: string;
}

const DEFAULT_VALUES: CommentInput = {
  content: ""
};

export function CommentForm({ blogId }: CommentFormProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { control, handleSubmit, watch, setValue } = useForm<CommentInput>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(commentSchema)
  });

  const content = watch("content");

  const createCommentMutation = useMutation({
    mutationFn: (body: CreateCommentRequest) =>
      fetchApi({
        url: API_ENDPOINTS.COMMENT.CREATE,
        method: "POST",
        body
      })
  });

  const onSubmit = handleSubmit((data: CommentInput) => {
    const createCommentRequest: CreateCommentRequest = {
      content: data.content,
      blog: blogId
    };

    createCommentMutation.mutate(createCommentRequest, {
      onSuccess: () => {
        setValue("content", "");
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
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add a Comment
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-sm">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <FormTextarea control={control} name="content" />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {content.length}/1000 characters
              </span>
              <LoadingButton
                disabled={content.length === 0}
                isLoading={createCommentMutation.isPending}
                loadingText="Submiting..."
              >
                Post comment
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
