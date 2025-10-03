import React from "react";
import { fetchApiServer } from "@/utils/fetchApiServer";
import { API_ENDPOINTS } from "@/constants/api";
import { DataResponse } from "@/types/http.type";
import { Blog } from "@/types/blog.type";
import MyBlogCard from "@/components/BlogCard/MyBlogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminBlogsPage() {
  const res = await fetchApiServer<DataResponse<Blog[]>>({
    url: API_ENDPOINTS.BLOG.GET_ALL,
    method: "GET"
  });
  const blogs = res.data;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage blogs</h2>
        </div>
        <Link href="/blogs/actions/new">
          <Button>Create new blog</Button>
        </Link>
      </div>

      <div className="divide-y divide-gray-200">
        {blogs.map(blog => (
          <MyBlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Blogs - Memories - ADMIN",
    openGraph: {
      title: "Blogs - Memories - ADMIN"
    }
  };
}
