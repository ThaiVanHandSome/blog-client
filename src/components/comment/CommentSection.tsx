"use client";

import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

interface CommentSectionProps {
  blogId: string;
}

export function CommentSection({ blogId }: CommentSectionProps) {
  return (
    <div className="mt-12 border-t pt-8">
      <CommentForm blogId={blogId} />
      <CommentList blogId={blogId} />
    </div>
  );
}
