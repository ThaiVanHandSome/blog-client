import { extractIdFromSlug } from "@/lib/utils";
import { API_ENDPOINTS } from "@/constants/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LikeButton from "@/components/LikeButton";
import type { Blog } from "@/types/blog.type";
import { cookies } from "next/headers";

async function getBlogById(id: string): Promise<Blog | null> {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch(API_ENDPOINTS.BLOG.GET_BY_ID(id), {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data as Blog;
}

async function checkLiked(blogId: string) {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch(API_ENDPOINTS.LIKE.CHECK_LIKED(blogId), {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
  if (!res.ok) return false;
  const data = await res.json();
  return data.data as boolean;
}

export default async function BlogDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  if (!id) return notFound();

  const blog = await getBlogById(id);
  if (!blog) return notFound();

  const isLiked = await checkLiked(id);

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
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <article>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {blog.title}
        </h1>
        <p className="mt-3 text-gray-600">{blog.description}</p>

        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-[11px]">{initials}</AvatarFallback>
          </Avatar>
          <span className="truncate">{blog.author.name}</span>
          <span className="text-gray-300">•</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {formattedDate}
          </span>
          <span className="text-gray-300">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {readMinutes}m read
          </span>
          <span className="text-gray-300">•</span>
          <LikeButton
            blogId={blog._id}
            initialLikes={blog.likes}
            isLiked={isLiked}
          />
        </div>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-img:rounded-lg mt-8">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>
    </main>
  );
}
