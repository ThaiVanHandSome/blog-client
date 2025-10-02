"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/utils/fetchApi";
import { API_ENDPOINTS } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";
import { NotificationBell } from "@/components/NotificationBell";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading, isAuthenticated, clearAuthCache } = useAuth();

  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () =>
      fetchApi({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: "POST"
      })
  });

  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAuthCache();
        router.push("/auth/login");
      }
    });
  };

  return (
    <header
      className={`sticky top-3 bg-white z-50 w-full transition-all duration-300 container max-w-[80%] mx-auto border border-gray-300 rounded-2xl`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/images/logo.jpg"
                alt="logo"
                width={60}
                height={60}
              />
              <p className="font-bold text-lg font-display">Memories</p>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {isAuthenticated && (
                <Link
                  href="/blogs/create"
                  className="bg-purple-600 text-white px-4 py-1 rounded-2xl font-medium transition-colors duration-200 text-sm"
                >
                  Create Blog
                </Link>
              )}
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              // Loading state
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
                </div>
                <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ) : isAuthenticated && user ? (
              // Authenticated state
              <>
                <NotificationBell />

                <div className="hidden sm:block text-right">
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                  <div className="text-xs text-gray-500">Welcome back!</div>
                </div>

                <Avatar className="h-9 w-9 border-2 border-gray-200">
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    {user.name}
                  </AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  aria-label="Sign out"
                  onClick={handleLogout}
                  className="p-2 rounded hover:bg-gray-100 text-gray-700"
                >
                  <LogOutIcon className="size-5" strokeWidth={1.25} />
                </button>
              </>
            ) : (
              // Not authenticated state
              <div className="flex items-center space-x-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/blogs"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                All Blogs
              </Link>
              {isAuthenticated && (
                <Link
                  href="/blogs/create"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Blog
                </Link>
              )}
              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
