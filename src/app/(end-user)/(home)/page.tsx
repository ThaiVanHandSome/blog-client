import BlogCard from "@/components/BlogCard";
import FeaturedBlog from "@/components/FeaturedBlog";
import { API_ENDPOINTS } from "@/constants/api";
import { Blog } from "@/types/blog.type";
import { DataResponse } from "@/types/http.type";
import { fetchApiServer } from "@/utils/fetchApiServer";

export const dynamic = "force-static";

export default async function HomePage() {
  const data = await fetchApiServer<DataResponse<Blog[]>>({
    url: API_ENDPOINTS.BLOG.GET_ALL,
    method: "GET",
    includeCookies: false
  });
  const blogs = data.data;
  const featuredBlog = blogs.length > 0 ? blogs.shift() : null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        <FeaturedBlog blog={featuredBlog} />
      </div>
      <div className="my-12 w-full max-w-5xl mx-auto h-[0.5px] border border-slate-200"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-lg mb-4 font-semibold text-gray-400">Recent blogs</p>
        <div className="space-y-4">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Memories - Home",
    description: "Share your stories with me",
    openGraph: {
      title: "Memories - Home",
      description: "Share your stories with me"
    }
  };
}
