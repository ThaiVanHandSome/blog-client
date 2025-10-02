"use client";

import { useAuth } from "@/hooks";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import Link from "next/link";
import { Button } from "../ui/button";

interface CommentSectionProps {
  blogId: string;
}

export function CommentSection({ blogId }: CommentSectionProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mt-12 border-t pt-8">
      {isAuthenticated ? (
        <CommentForm blogId={blogId} />
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-gray-600 mb-4">
            You need to log in to comment on this post 💬
          </p>
          <Link href="/auth/login">
            <Button>Log in now</Button>
          </Link>
        </div>
      )}
      <CommentList blogId={blogId} />
    </div>
  );
}
