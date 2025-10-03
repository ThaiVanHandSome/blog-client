import React from "react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminDashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className=" px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <AdminSidebar />
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
