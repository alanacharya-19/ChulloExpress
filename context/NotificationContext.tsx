import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type NotificationItem = {
  id: string;
  icon: string;
  color: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
};

const initialData: NotificationItem[] = [
  { id: "1", icon: "checkmark-circle", color: "#22C55E", title: "Order Delivered", desc: "Your order from Burger House has been delivered.", time: "2 min ago", read: false },
  { id: "2", icon: "time-outline", color: "#FF6B00", title: "Order Preparing", desc: "Your Pizza Hub order is being prepared.", time: "15 min ago", read: false },
  { id: "3", icon: "pricetag-outline", color: "#3B82F6", title: "50% OFF Deal", desc: "Get 50% off on all Momos at Momo King today!", time: "1 hour ago", read: false },
  { id: "4", icon: "star-outline", color: "#FACC15", title: "Rate Your Meal", desc: "How was your food from Royal Kitchen? Rate now.", time: "2 hours ago", read: true },
  { id: "5", icon: "location-outline", color: "#8B5CF6", title: "New Restaurant Nearby", desc: "BBQ Nation just opened near your location.", time: "1 day ago", read: true },
];

type NotificationContextType = {
  notifications: NotificationItem[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialData);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const value = useMemo(() => ({ notifications, unreadCount, markRead, markAllRead }), [notifications, unreadCount, markRead, markAllRead]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
