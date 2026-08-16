"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ShoppingCart, ChevronDown, User, LogOut } from "lucide-react";
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
  const router = useRouter();
  const { cartCount, logout } = useStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);

  const label =
    CRUMB.find((c) =>
      c.startsWith ? pathname.startsWith(c.match) : pathname === c.match
    )?.label || "Boutique";

  const onCartClick = () => {
    setNotifOpen(false);
  };

  useEffect(() => {
    if (!userOpen) return;
    const onClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [userOpen]);

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
        <div className="user-menu-anchor" ref={userRef}>
          <div
            className="topbar-client"
            onClick={() => setUserOpen((v) => !v)}
            data-testid="button-user-menu"
            role="button"
            tabIndex={0}
          >
            <div className="avatar">{CLIENT.initials}</div>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{CLIENT.shortName}</span>
            <ChevronDown size={14} color="hsl(var(--muted-foreground))" />
          </div>
          {userOpen ? (
            <div className="user-menu-panel">
              <button onClick={() => { router.push("/profile"); setUserOpen(false); }}>
                <User size={15} />
                Mon profil
              </button>
              <div className="menu-sep" />
              <button className="danger" onClick={() => { logout(); setUserOpen(false); router.push("/login"); }}>
                <LogOut size={15} />
                Déconnexion
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
