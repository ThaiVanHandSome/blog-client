import BlogCard from "@/components/BlogCard";
import { API_ENDPOINTS } from "@/constants/api";
import { Blog } from "@/types/blog.type";
import { DataResponse } from "@/types/http.type";
import { fetchApiServer } from "@/utils/fetchApiServer";

export default async function HomePage() {
  const data = await fetchApiServer<DataResponse<Blog[]>>({
    url: API_ENDPOINTS.BLOG.GET_ALL,
    method: "GET",
    includeCookies: false
  });
  console.log(data);
  const blogs = data.data;

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
