"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  return (
    <header className="h-14 border-b border-gray-200 bg-white">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-semibold tracking-tight">
            Admin
          </Link>
          <nav className="hidden sm:flex items-center gap-3 text-sm text-gray-600">
            <Link href="/admin/blogs" className="hover:text-gray-900">
              Blogs
            </Link>
          </nav>
        </div>
        <div>
          <Button>Logout</Button>
        </div>
      </div>
    </header>
  );
}
