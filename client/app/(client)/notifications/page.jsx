"use client";

import { useState } from "react";
import { Bell, CheckCheck, Package, Timer, Truck, UserRound, Boxes, Check } from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

const TYPE_ICON = {
  order: Package,
  stock: Timer,
  truck: Truck,
  account: UserRound,
  catalog: Boxes,
};

const FILTERS = [
  { key: "all", label: "Toutes" },
  { key: "unread", label: "Non lues" },
];

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markNotificationRead } = useStore();
  const [filter, setFilter] = useState("all");

  const list = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const counts = {
    all: notifications.length,
    unread: unreadCount,
  };

  return (
    <>
      <PageHeader
        eyebrow="Centre de notifications"
        title="Notifications"
        description="Suivez l'avancement de vos commandes et les arrivages de vos références."
        action={
          unreadCount > 0 ? (
            <button
              className="button button-secondary"
              onClick={markAllRead}
              data-testid="button-mark-all-read"
            >
              <CheckCheck size={15} />
              Tout marquer comme lu
            </button>
          ) : null
        }
      />

      <div className="notif-page-layout">
        <aside className="surface notif-panel-card">
          <h2 className="profile-section-title" style={{ marginBottom: 12 }}>
            Filtres
          </h2>
          <div className="notif-filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`notif-filter ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
                <span className="filter-count">{counts[f.key]}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="surface table-surface">
          {list.length === 0 ? (
            <EmptyState
              icon={<Bell size={22} />}
              title="Aucune notification"
              description="Vous serez notifié dès qu'une commande évolue ou qu'un arrivage est disponible."
            />
          ) : (
            <div className="notif-list">
              {list.map((n) => (
                <div key={n.id} className={`notif-page-item ${n.read ? "" : "unread"}`}>
                  <div className={`notif-icon type-${n.type}`}>
                    {(() => {
                      const Icon = TYPE_ICON[n.type] || Package;
                      return <Icon size={17} />;
                    })()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4>{n.title}</h4>
                    <p>{n.message}</p>
                    <time>{n.time}</time>
                  </div>
                  {!n.read ? (
                    <button
                      className="notif-mark-read"
                      onClick={() => markNotificationRead(n.id)}
                      aria-label="Marquer comme lu"
                      title="Marquer comme lu"
                    >
                      <Check size={14} />
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
