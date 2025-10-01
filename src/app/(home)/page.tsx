import { cookies } from "next/headers";
import BlogCard from "@/components/BlogCard";
import { API_ENDPOINTS } from "@/constants/api";
import { Blog } from "@/types/blog.type";

const getBlogs = async () => {
  try {
    const cookieHeader = (await cookies()).toString();

    const blogsRes = await fetch(API_ENDPOINTS.BLOG.GET_ALL, {
      method: "GET",
      headers: {
        Cookie: cookieHeader
      },
      cache: "no-store"
    });

    return blogsRes.json();
  } catch (error) {
    throw error;
  }
};

export default async function HomePage() {
  const data = await getBlogs();
  const blogs = data.data as Blog[];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
        <div className="text-center mt-16 text-gray-500">
          <p>© 2024 Blog Website. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
