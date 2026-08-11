"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ShoppingCart, ChevronDown } from "lucide-react";
import { useStore } from "@/components/store";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { CLIENT } from "@/lib/data";

const CRUMB = [
  { match: "/cart", label: "Panier" },
  { match: "/checkout", label: "Commande" },
  { match: "/orders", label: "Commandes", startsWith: true },
  { match: "/notifications", label: "Notifications" },
  { match: "/profile", label: "Profil" },
  { match: "/contact", label: "Contact" },
];

export default function Topbar() {
  const pathname = usePathname();
  const { cartCount } = useStore();
  const [notifOpen, setNotifOpen] = useState(false);

  const label =
    CRUMB.find((c) =>
      c.startsWith ? pathname.startsWith(c.match) : pathname === c.match
    )?.label || "Boutique";

  const onCartClick = (e) => {
    setNotifOpen(false);
  };

  return (
    <header className="topbar">
      <div className="crumb">
        Espace client
        <ChevronRight size={12} />
        <strong>{label}</strong>
      </div>
      <div className="topbar-actions">
        <NotificationDropdown
          open={notifOpen}
          onToggle={() => setNotifOpen((v) => !v)}
          onClose={() => setNotifOpen(false)}
        />
        <Link
          href="/cart"
          className={`icon-button${cartCount > 0 ? " has-count" : ""}`}
          aria-label="Voir le panier"
          data-testid="link-topbar-cart"
          onClick={onCartClick}
          data-count={cartCount > 0 ? cartCount : undefined}
        >
          <ShoppingCart size={17} />
        </Link>
        <div className="topbar-client">
          <div className="avatar">{CLIENT.initials}</div>
          <span style={{ fontSize: 12, fontWeight: 700 }}>{CLIENT.shortName}</span>
          <ChevronDown size={14} color="hsl(var(--muted-foreground))" />
        </div>
      </div>
    </header>
  );
}
