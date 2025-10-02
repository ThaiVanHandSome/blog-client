/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import dynamic from "next/dynamic";
import FormInput from "@/components/form/FormInput";
import LoadingButton from "@/components/LoadingButton";
import { API_ENDPOINTS } from "@/constants/api";
import { BLogInput, blogSchema } from "@/schemas";
import { fetchApi } from "@/utils/fetchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

const Editor = dynamic(() => import("@/components/form/Editor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading editor...</p>
    </div>
  )
}) as any;

const DEFAULT_VALUES: BLogInput = {
  title: "",
  description: "",
  topic: "",
  thumbnail: "",
  content: ""
};

export default function CreateBlogPage() {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<BLogInput>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(blogSchema)
  });

  const createBlogMutation = useMutation({
    mutationFn: (data: FormData) =>
      fetchApi({
        url: API_ENDPOINTS.BLOG.CREATE,
        method: "POST",
        body: data
      })
  });

  const router = useRouter();

  const onSubmit = handleSubmit((data: BLogInput) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("topic", data.topic);
    if (file) {
      formData.append("file", file);
    }
    formData.append(
      "content",
      `<div class="blog-content">${data.content}</div>`
    );
    createBlogMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/");
      }
    });
  });

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = e => {
          const result = e.target?.result as string;
          setPreviewImage(result);
          setValue("thumbnail", result);
          setFile(file);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const clearThumbnail = () => {
    setValue("thumbnail", "");
    setPreviewImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-[90%] max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">
            Share your knowledge and experience with the community
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6"
          >
            {/* Left Column: Meta Fields */}
            <div className="space-y-8 lg:pr-6 lg:border-r lg:border-gray-200 col-span-1">
              {/* Title Field */}
              <div>
                <FormInput
                  label="Blog Title"
                  control={control}
                  name="title"
                  placeholder="Enter your blog post title..."
                  className="text-lg"
                />
              </div>

              {/* Description Field */}
              <div>
                <FormInput
                  label="Short Description"
                  control={control}
                  name="description"
                  placeholder="Brief description of your blog content..."
                  className="text-base"
                  multiline
                  rows={3}
                />
              </div>

              {/* Topic Field */}
              <div>
                <FormInput
                  label="Topic"
                  control={control}
                  name="topic"
                  placeholder="Enter your blog topic (e.g., Development, Design, AI/ML)..."
                  className="text-base"
                />
              </div>

              {/* Thumbnail Field */}
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image <span className="text-red-500">*</span>
                </p>

                {/* File Input (Hidden) */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  id="thumbnail-input"
                  className="hidden"
                />

                {/* Image Preview */}
                {previewImage && (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Thumbnail preview"
                      className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                      onError={() => setPreviewImage("")}
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-lg text-xs">
                      Preview
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      <button
                        type="button"
                        onClick={openFileDialog}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={clearThumbnail}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {/* Drag & Drop Area */}
                <button
                  type="button"
                  className={`w-full h-48 border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  } ${
                    previewImage ? "hidden" : "flex"
                  } items-center justify-center`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileDialog}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openFileDialog();
                    }
                  }}
                  onKeyUp={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openFileDialog();
                    }
                  }}
                >
                  <div className="text-center">
                    <Upload
                      className={`w-12 h-12 mx-auto mb-2 ${
                        isDragOver ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        isDragOver ? "text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {isDragOver
                        ? "Drop your image here"
                        : "Click to choose or drag & drop"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supports: JPG, PNG, GIF, WebP (Max: 5MB)
                    </p>
                  </div>
                </button>

                {errors.thumbnail && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.thumbnail.message}
                  </p>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  Use images with minimum size 800x600px to ensure display
                  quality. Maximum file size: 5MB.
                </p>
              </div>
            </div>

            {/* Right Column: Content Editor */}
            <div className="space-y-4 lg:pl-6 lg:col-span-2 col-span-1">
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Blog Content <span className="text-red-500">*</span>
              </p>
              <Editor control={control} label="" name="content" />
              <p className="text-sm text-gray-500">
                Write detailed and valuable content for your readers
              </p>
            </div>

            {/* Submit Button - full width */}
            <div className="col-span-full pt-6 border-t border-gray-200 flex items-center justify-center">
              <LoadingButton
                type="submit"
                isLoading={createBlogMutation.isPending}
                loadingText="Creating blog post..."
                className=" bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer px-8 py-2"
              >
                Create Blog Post
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
