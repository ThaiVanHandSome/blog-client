import { User } from "@/types/user.type";

export interface Blog {
    _id: string;
  title: string;
  description: string;
  topic: string;
  content: string;
  thumbnail: string;
  likes: number;
  author: User;
  published_at: string;
}
