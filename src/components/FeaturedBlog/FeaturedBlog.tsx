import { Blog } from "@/types/blog.type";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { buildBlogSlug } from "@/lib/utils";

interface FeaturedBlogProps {
  blog: Blog | null | undefined;
}

export default function FeaturedBlog({ blog }: FeaturedBlogProps) {
  if (!blog) return null;

  const formattedDate = (() => {
    const d = new Date(blog.published_at);
    if (isNaN(d.getTime())) return blog.published_at;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  })();

  return (
    <Link
      href={`/blogs/${buildBlogSlug(blog.title, blog._id)}`}
      className="block w-full mb-8"
    >
      <div className="w-full">
        <Image
          src={blog.thumbnail}
          alt={`${blog.title} - thumbnail`}
          width={1600}
          height={900}
          className="w-full h-full object-cover aspect-[2.4/1] mb-8"
        />

        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-4 px-2 lg:px-0">
          <h3 className="text-2xl md:text-4xl leading-9 md:leading-12 font-bold drop-shadow-lg mb-4  flex items-center flex-col lg:flex-row gap-2">
            <Badge className="bg-red-600">New</Badge> {blog.title}
          </h3>
          <p className="italic font-serif text-sm text-gray-500">
            {blog.description}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-bPurple-500 text-white font-semibold">
                  {blog.author.name}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-sm font-semibold text-bPurple-500">
                {blog.author.name}
              </span>
            </div>
            <p className="font-semibold text-xs">Published {formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
