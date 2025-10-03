"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag, Eye, Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog.type";
import { buildBlogSlug } from "@/lib/utils";
import BlogActions from "./BlogActions";
import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";

interface MyBlogCardProps {
  readonly blog: Blog;
}

export default function MyBlogCard({ blog }: Readonly<MyBlogCardProps>) {
  const words = blog.content?.trim()?.split(/\s+/).length || 0;
  const readMinutes = Math.max(1, Math.ceil(words / 200));

  const formattedDate = (() => {
    const d = new Date(blog.published_at);
    if (isNaN(d.getTime())) return blog.published_at;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  })();

  const initials = blog.author?.name
    ?.split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) =>
      fetchApi({
        url: API_ENDPOINTS.BLOG.DELETE_BY_ID(id),
        method: "DELETE"
      })
  });

  const onEdit = () => {};

  const onDelete = async () => {
    await deleteBlogMutation.mutateAsync(blog._id);
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
      <div className="flex items-stretch gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative h-24 w-36 md:h-28 md:w-44 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 144px, 176px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 text-[10px] font-medium bg-white/95 text-gray-700 border border-gray-200"
          >
            <Tag className="h-3 w-3 mr-1" />
            {blog.topic}
          </Badge>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <Link
                href={`/blogs/${buildBlogSlug(blog.title, blog._id)}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
              >
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {blog.description}
              </p>
            </div>

            {/* Actions */}
            <div className="ml-4 shrink-0">
              <BlogActions blog={blog} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[10px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{blog.author.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readMinutes}m read</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                <span>{blog.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
