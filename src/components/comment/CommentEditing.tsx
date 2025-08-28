"use query";

import { CommentInput, commentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import FormTextarea from "../form/FormTextArea";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";

interface CommentEditingProps {
  readonly content: string;
  readonly commentId: string;
  readonly setStartEditing: (value: React.SetStateAction<boolean>) => void;
}

export default function CommentEditing({
  content,
  commentId,
  setStartEditing
}: CommentEditingProps) {
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<CommentInput>({
    defaultValues: {
      content
    },
    resolver: zodResolver(commentSchema)
  });

  const editCommentMutation = useMutation({
    mutationFn: (body: CommentInput) =>
      fetchApi({
        url: API_ENDPOINTS.COMMENT.UPDATE(commentId),
        method: "PATCH",
        body
      })
  });

  const isLoading = editCommentMutation.isPending;

  const onSubmit = handleSubmit((data: CommentInput) => {
    editCommentMutation.mutate(data, {
      onSuccess: () => {
        setStartEditing(false);
        queryClient.refetchQueries([`comments-${blogId}`, blogId]);
      }
    });
  });

  return (
    <div className="space-y-2">
      <form onSubmit={onSubmit}>
        <FormTextarea control={control} name="content" />

        <div className="flex gap-2 mt-2 justify-end">
          <LoadingButton size="sm" type="submit" isLoading={isLoading}>
            Save
          </LoadingButton>
          <Button
            type="button"
            disabled={isLoading}
            variant="outline"
            size="sm"
            onClick={() => setStartEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
