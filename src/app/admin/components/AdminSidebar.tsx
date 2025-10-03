"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`block rounded-md px-3 py-2 text-sm transition ${
        isActive
          ? "bg-bPurple-500/80 text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {label}
    </Link>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="p-4 space-y-2">
        <NavItem href="/admin" label="Tổng quan" />
        <NavItem href="/admin/blogs" label="Blogs" />
      </div>
    </aside>
  );
}
