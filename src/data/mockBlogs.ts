export interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
}

export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "The Art of UI/UX Design in the Digital Age",
    description:
      "Explore the latest design trends and learn how to create memorable user experiences in the modern digital world.",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    author: "John Smith",
    publishDate: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Design",
  },
  {
    id: "2",
    title: "React 18: Exciting New Features to Explore",
    description:
      "Discover Concurrent Features, Suspense improvements and important enhancements in React 18 that make your applications faster.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    author: "Sarah Johnson",
    publishDate: "Dec 12, 2024",
    readTime: "12 min read",
    category: "Development",
  },
  {
    id: "3",
    title: "Machine Learning for Beginners: A Complete Guide",
    description:
      "Learn Machine Learning from basics to advanced, from theory to practice with Python and popular libraries.",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    author: "Michael Chen",
    publishDate: "Dec 10, 2024",
    readTime: "15 min read",
    category: "AI/ML",
  },
  {
    id: "4",
    title: "SEO Optimization for Next.js Websites",
    description:
      "Effective SEO strategies and techniques to improve your Next.js website ranking on search engines.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c072?w=800&h=600&fit=crop",
    author: "Emily Davis",
    publishDate: "Dec 8, 2024",
    readTime: "10 min read",
    category: "SEO",
  },
  {
    id: "5",
    title: "Microservices Architecture with Docker",
    description:
      "Build efficient distributed systems with microservices, Docker containers and modern orchestration tools.",
    thumbnail:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop",
    author: "David Wilson",
    publishDate: "Dec 5, 2024",
    readTime: "18 min read",
    category: "DevOps",
  },
  {
    id: "6",
    title: "TypeScript: From Basics to Advanced",
    description:
      "Master TypeScript with powerful type system features, generics, decorators and best practices for enterprise projects.",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    author: "Lisa Brown",
    publishDate: "Dec 3, 2024",
    readTime: "14 min read",
    category: "Development",
  },
  {
    id: "7",
    title: "Database Design for Web Applications at Scale",
    description:
      "Database design principles, indexing strategies and optimization techniques for highly scalable web applications.",
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
    author: "Robert Taylor",
    publishDate: "Dec 1, 2024",
    readTime: "16 min read",
    category: "Database",
  },
  {
    id: "8",
    title: "Security Best Practices for Web Applications",
    description:
      "Protect your web applications from common attacks with OWASP Top 10, authentication, authorization and data encryption.",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    author: "Jennifer Lee",
    publishDate: "Nov 28, 2024",
    readTime: "13 min read",
    category: "Security",
  },
];
