"use client";

import Editor from "@/components/form/Editor";
import FormInput from "@/components/form/FormInput";
import LoadingButton from "@/components/LoadingButton";
import { API_ENDPOINTS } from "@/constants/api";
import { BLogInput, blogSchema } from "@/schemas";
import { fetchApi } from "@/utils/fetchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const DEFAULT_VALUES: BLogInput = {
  title: "",
  content: ""
};

export default function CreateBlogPage() {
  const { control, handleSubmit } = useForm<BLogInput>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(blogSchema)
  });

  const createBlogMutation = useMutation({
    mutationFn: (data: BLogInput) =>
      fetchApi({
        url: API_ENDPOINTS.BLOG.CREATE,
        method: "POST",
        body: data
      })
  });

  const router = useRouter();

  const onSubmit = handleSubmit((data: BLogInput) => {
    createBlogMutation.mutate(data, {
      onSuccess: () => {
        router.push("/");
      }
    });
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormInput
          label="Title"
          control={control}
          name="title"
          placeholder="Enter title here..."
        />
        <Editor control={control} label="Content" name="content" />
        <LoadingButton
          type="submit"
          isLoading={createBlogMutation.isPending}
          loadingText="Creating..."
        >
          Create
        </LoadingButton>
      </form>
    </div>
  );
}
