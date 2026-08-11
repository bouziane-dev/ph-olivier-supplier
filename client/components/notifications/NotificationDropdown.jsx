"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useStore } from "@/components/store";
import { NotificationItem } from "./NotificationItem";

export default function NotificationDropdown({ open, onToggle, onClose }) {
  const { notifications, unreadCount, markAllRead } = useStore();
  const router = useRouter();
  const anchorRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, onClose]);

  const recent = notifications.slice(0, 4);

  return (
    <div className="notification-anchor" ref={anchorRef}>
      <button
        className="icon-button"
        onClick={onToggle}
        aria-label="Notifications"
        data-testid="button-notifications"
      >
        <Bell size={17} />
        {unreadCount > 0 ? <i className="notification-dot" /> : null}
      </button>
      {open ? (
        <div className="notification-panel" data-testid="panel-notifications">
          <h4>
            Notifications
            {unreadCount > 0 ? (
              <span className="status status-orange">{unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}</span>
            ) : (
              <span className="status status-gray">Tout est à jour</span>
            )}
          </h4>
          <div className="notification-list">
            {recent.map((item) => (
              <NotificationItem key={item.id} item={item} onClick={onClose} />
            ))}
          </div>
          <div className="panel-foot">
            <button
              className="link-btn"
              onClick={() => markAllRead()}
              disabled={unreadCount === 0}
            >
              Tout marquer comme lu
            </button>
            <button
              className="link-btn"
              onClick={() => {
                router.push("/notifications");
                onClose();
              }}
            >
              Voir toutes
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
