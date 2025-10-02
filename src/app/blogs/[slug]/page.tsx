import { buildBlogSlug, extractIdFromSlug } from "@/lib/utils";
import { API_ENDPOINTS } from "@/constants/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Blog } from "@/types/blog.type";
import { cookies } from "next/headers";
import LikeButton from "@/components/LikeButton";
import { CommentSection } from "@/components/comment";

async function getBlogById(id: string): Promise<Blog | null> {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.BLOG.GET_BY_ID(id)}`,
    {
      headers: {
        Cookie: cookieHeader
      },
      cache: "no-store"
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data as Blog;
}

async function checkLiked(blogId: string) {
  const cookieHeader = (await cookies()).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.LIKE.CHECK_LIKED(
      blogId
    )}`,
    {
      headers: {
        Cookie: cookieHeader
      },
      cache: "no-store"
    }
  );
  if (!res.ok) return false;
  const data = await res.json();
  return data.data as boolean;
}

export async function generateStaticParams() {
  const blogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.BLOG.GET_ALL}`
  );
  if (blogsRes.ok) {
    const res = await blogsRes.json();
    const data = res.data;

    return data.map((blog: Blog) => ({
      slug: buildBlogSlug(blog.title, blog._id)
    }));
  }

  return [];
}

export default async function BlogDetailPage({
  params
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
      year: "numeric"
    });
  })();

  const initials = blog.author?.name
    ?.split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="px-4 py-8">
      <div className="container max-w-3xl mx-auto flex flex-col items-center space-y-4">
        <p className="font-semibold text-sm text-bPurple-500">
          Published {formattedDate}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 break-words font-display">
          {blog.title}
        </h1>
        <p className="mt-3 text-gray-500 text-sm italic">{blog.description}</p>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-[11px]">{initials}</AvatarFallback>
          </Avatar>
          <span className="truncate text-sm font-semibold">
            {blog.author.name}
          </span>
        </div>
        <LikeButton
          blogId={blog._id}
          initialLikes={blog.likes}
          isLiked={isLiked}
        />
      </div>

      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden container max-w-6xl mx-auto">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="my-12 container max-w-5xl mx-auto h-[1px]  bg-gray-300"></div>

      <article className="container mx-auto max-w-3xl ">
        <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-img:rounded-lg mt-8">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>

      <div className="container max-w-5xl mx-auto">
        <CommentSection blogId={id} />
      </div>
    </main>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const id = extractIdFromSlug(slug);
  const blog = await getBlogById(id as string);

  const title = blog?.title;
  const description = blog?.description;
  const oImage = blog?.thumbnail;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: oImage
    }
  };
}
