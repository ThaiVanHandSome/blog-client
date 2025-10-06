import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyBlogCard from "@/components/BlogCard/MyBlogCard";
import { Blog } from "@/types/blog.type";
import { API_ENDPOINTS } from "@/constants/api";
import { fetchApiServer } from "@/utils/fetchApiServer";
import { DataResponse } from "@/types/http.type";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function MyBlogsPage() {
  const cookiesRes = await cookies().toString();
  console.log({
    cookiesRes
  });
  const data = await fetchApiServer<DataResponse<Blog[]>>({
    url: API_ENDPOINTS.BLOG.GET_OWN_BLOGS,
    method: "GET"
  });
  const blogs = data.data;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-400 font-display">
            My Blogs
          </h2>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search blogs by title, description, or topic..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div> */}

      {/* // <div className="mb-6 flex items-center justify-between">
      //   <div className="flex items-center gap-2">
      //     {searchQuery && (
      //       <Badge variant="secondary" className="text-xs">
      //         Search: {searchQuery}
      //       </Badge>
      //     )}
      //   </div>
      // </div> */}

      <div className="space-y-5">
        {blogs.length > 0 ? (
          blogs.map(blog => <MyBlogCard key={blog._id} blog={blog} />)
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blogs found
              </h3>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Blog
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
