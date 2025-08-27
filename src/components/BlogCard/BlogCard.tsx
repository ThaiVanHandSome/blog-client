import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Blog } from "@/types/blog.type";
import { buildBlogSlug } from "@/lib/utils";

interface BlogCardProps {
  readonly blog: Blog;
}

export default function BlogCard({ blog }: Readonly<BlogCardProps>) {
  const words = blog.content?.trim()?.split(/\s+/).length || 0;
  const readMinutes = Math.max(1, Math.ceil(words / 200));

  const formattedDate = (() => {
    const d = new Date(blog.published_at);
    if (isNaN(d.getTime())) return blog.published_at;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  })();

  const initials = blog.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/blogs/${buildBlogSlug(blog.title, blog._id)}`}
      prefetch={false}
      className="group block w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
    >
      <article className="w-full relative overflow-hidden border-b border-gray-200 transition-colors duration-150 hover:bg-gray-50">
        <div className="flex items-stretch gap-4 p-3 md:p-4">
          {/* Thumbnail (Compact Full-Width Row) */}
          <div className="relative h-24 w-36 md:h-28 md:w-44 shrink-0 overflow-hidden rounded-md">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 144px, 176px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
            <span
              className="absolute left-2 top-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-indigo-50/95 to-blue-50/95 text-blue-700 ring-1 ring-inset ring-blue-200/60 shadow-sm backdrop-blur-sm transition-colors duration-200 group-hover:from-indigo-100 group-hover:to-blue-100"
              aria-label="Blog topic"
              title={`Topic: ${blog.topic}`}
            >
              <Tag className="h-3.5 w-3.5" />
              <span className="uppercase tracking-wide">{blog.topic}</span>
            </span>
          </div>

          {/* Content (Compact) */}
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight line-clamp-1 group-hover:text-blue-600">
              {blog.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {blog.description}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 text-[13px] text-gray-500">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[11px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{blog.author.name}</span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 shrink-0">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 shrink-0">
                  <Clock className="h-3.5 w-3.5" />
                  {readMinutes}m
                </span>
              </div>

              <span className="shrink-0 text-[13px] font-medium text-blue-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Read →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
