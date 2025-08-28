import { User } from "@/types/user.type";

export interface Comment {
  _id: string;
  content: string;
  like: number;
  user: User;
  blog: string;
  parent_comment?: string; // ID of parent comment if this is a reply
  replies?: Comment[]; // Array of reply comments
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content: string;
  blog: string;
}

export interface ReplyRequest {
  content: string;
  blog: string;
  parent_comment: string;
}
