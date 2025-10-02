import { cookies } from "next/headers";
import BlogCard from "@/components/BlogCard";
import { API_ENDPOINTS } from "@/constants/api";
import { Blog } from "@/types/blog.type";

const getBlogs = async () => {
  try {
    const cookieHeader = (await cookies()).toString();

    const blogsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.BLOG.GET_ALL}`,
      {
        method: "GET",
        headers: {
          Cookie: cookieHeader
        },
        cache: "no-store"
      }
    );

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
