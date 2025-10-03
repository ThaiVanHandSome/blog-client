import React, { useState } from "react";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Blog } from "@/types/blog.type";
import DeleteBlogDialog from "./DeleteBlogDialog";
import Link from "next/link";

interface BlogActionsProps {
  readonly blog: Blog;
  readonly onEdit?: (blog: Blog) => void | Promise<void>;
  readonly onDelete: (blogId: string) => void | Promise<void>;
}

export default function BlogActions({
  blog,
  onDelete
}: Readonly<BlogActionsProps>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    await onDelete(blog._id);
    setShowDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Link
              href={`/blogs/actions/${blog._id}`}
              className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-50"
            >
              <Edit2 className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700">Edit Blog</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="flex items-center gap-2 cursor-pointer hover:bg-red-50 focus:bg-red-50"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            <span className="text-red-700">Delete Blog</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteBlogDialog
        isOpen={showDeleteDialog}
        blogTitle={blog.title}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}
