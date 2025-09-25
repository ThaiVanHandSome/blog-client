import { NotificationItem } from "@/types/notification.type";

export const mockNotifications: NotificationItem[] = [
  { id: "1", title: "New comment on your blog", type: "info", read: false },
  { id: "2", title: "Your blog was liked", type: "success", read: false },
  { id: "3", title: "Password will expire soon", type: "warning", read: true },
  { id: "4", title: "Failed to publish draft", type: "error", read: true },
];
