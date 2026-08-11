"use client";

import { Package, Truck, Timer, UserRound, Boxes, PackageCheck } from "lucide-react";
import { useStore } from "@/components/store";

const TYPE_ICON = {
  order: Package,
  stock: Timer,
  truck: Truck,
  account: UserRound,
  catalog: Boxes,
  delivered: PackageCheck,
};

export function NotificationItem({ item, onClick }) {
  const { markNotificationRead } = useStore();
  const Icon = TYPE_ICON[item.type] || Package;

  return (
    <div
      className="notification-item"
      onClick={() => {
        markNotificationRead(item.id);
        onClick?.();
      }}
    >
      <div className="empty-icon" style={{ width: 28, height: 28, borderRadius: 9, margin: 0, flex: "none" }}>
        <Icon size={14} />
      </div>
      <p>
        <b>{item.title}</b>. {item.message}
        <span>{item.time}</span>
      </p>
    </div>
  );
}
