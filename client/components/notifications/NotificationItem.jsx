"use client";

import { Package, Truck, Timer, UserRound, Boxes, PackageCheck, Check } from "lucide-react";
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
    <div className={`notification-item ${item.read ? "" : "unread"}`}>
      <div className="empty-icon" style={{ width: 28, height: 28, borderRadius: 9, margin: 0, flex: "none" }}>
        <Icon size={14} />
      </div>
      <p>
        <b>{item.title}</b>. {item.message}
        <span>{item.time}</span>
      </p>
      {!item.read ? (
        <button
          className="notif-mark-read"
          onClick={(e) => {
            e.stopPropagation();
            markNotificationRead(item.id);
          }}
          aria-label="Marquer comme lu"
          title="Marquer comme lu"
        >
          <Check size={12} />
        </button>
      ) : null}
    </div>
  );
}
