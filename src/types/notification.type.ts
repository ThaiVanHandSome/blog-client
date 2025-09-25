export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationItem {
  id: string;
  title: string;
  type: NotificationType;
  createdAt?: string;
  read?: boolean;
}
