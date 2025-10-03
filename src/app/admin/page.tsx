import React from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Tổng quan nhanh cho quản trị viên</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/blogs"
          className="group rounded-lg border border-gray-200 bg-white p-5 hover:shadow-sm transition focus:outline-none focus:ring-2 focus:ring-gray-900/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Blogs</h3>
              <p className="text-sm text-gray-500 mt-1">Quản lý bài viết</p>
            </div>
            <span className="text-gray-400 group-hover:text-gray-600">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Memories - ADMIN",
    openGraph: {
      title: "Memories - ADMIN"
    }
  };
}
