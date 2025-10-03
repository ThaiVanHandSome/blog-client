"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, BookOpen } from "lucide-react";

interface UserLayoutProps {
  readonly children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            My Account
          </h1>
          <p className="mt-2 text-gray-600 italic text-sm">
            Manage your profile and content
          </p>
        </div>

        <div className="flex gap-4">
          <div className="w-64 shrink-0">
            <nav className="p-4">
              <div className="space-y-2">
                <SidebarNavItem href="/profile" icon={User} label="Profile" />
                <SidebarNavItem
                  href="/my-blogs"
                  icon={BookOpen}
                  label="My Blogs"
                />
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-md border border-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarNavItemProps {
  readonly href: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly label: string;
}

function SidebarNavItem({
  href,
  icon: Icon,
  label
}: Readonly<SidebarNavItemProps>) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`group block px-3 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-bPurple-500/20 border shadow-sm text-white"
          : "hover:bg-gray-50 border border-transparent"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`p-2 rounded-md transition-colors ${
            isActive
              ? "bg-bPurple-500 text-white"
              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-medium transition-colors ${
              isActive
                ? "text-bPurple-500"
                : "text-gray-900 group-hover:text-gray-700"
            }`}
          >
            {label}
          </h3>
        </div>
      </div>
    </Link>
  );
}
