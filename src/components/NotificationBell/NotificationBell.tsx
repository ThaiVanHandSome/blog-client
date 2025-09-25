"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { NotificationItem } from "@/types/notification.type";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, API_URL } from "@/constants/api";
import { fetchApi } from "@/utils/fetchApi";
import { Badge } from "@/components/ui/badge";
import { DataResponse } from "@/types/http.type";
import { io } from "socket.io-client";
import { toast } from "sonner";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      fetchApi<DataResponse<NotificationItem[]>>({
        url: API_ENDPOINTS.NOTIFICATIONS.GET_ALL,
        method: "GET",
        showToastWhenSuccess: false,
        showToastWhenError: false,
      }),
  });

  const notifications = data?.data || [];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const socket = io(API_URL, {
      transports: ["websocket"],
      autoConnect: true,
      withCredentials: true,
    });

    socket.on("notification", (n: NotificationItem) => {
      refetch();
      toast.success(n.title);
    });

    return () => {
      socket.disconnect();
      socket.close();
    };
  });

  return (
    <div className="relative">
      <button
        aria-label="Notifications"
        className="relative p-2 rounded hover:bg-gray-100 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-5 w-5 text-gray-700" />
        {notifications?.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-semibold flex items-center justify-center">
            {notifications?.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50">
          <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Notifications
            </span>
            <span className="text-xs text-gray-500">
              {notifications?.length} total
            </span>
          </div>
          <ul className="max-h-80 overflow-auto divide-y divide-gray-100">
            {notifications.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-gray-500">
                No notifications
              </li>
            )}
            {notifications.map((n) => (
              <li key={n.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <Badge>{n.type}</Badge>
                  <div className="flex-1">
                    <div
                      className={`text-sm ${
                        n.read ? "text-gray-600" : "text-gray-800 font-medium"
                      }`}
                    >
                      {n.title}
                    </div>
                    {n.createdAt && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        {n.createdAt}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
