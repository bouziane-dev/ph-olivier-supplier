"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Store,
  ShoppingCart,
  Package,
  Bell,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useStore } from "@/components/store";
import Brand from "./Brand";
import { CLIENT } from "@/lib/data";

export const CLIENT_NAV = [
  { href: "/", label: "Boutique", icon: Store },
  { href: "/cart", label: "Panier", icon: ShoppingCart, count: "cart" },
  { href: "/orders", label: "Commandes", icon: Package },
  { href: "/notifications", label: "Notifications", icon: Bell, count: "unread" },
  { href: "/profile", label: "Profil", icon: User },
  { href: "/contact", label: "Contact", icon: HelpCircle },
];

export function NavLink({ item, onNavigate }) {
  const { cartCount, unreadCount } = useStore();
  const pathname = usePathname();
  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  const count =
    item.count === "cart" ? cartCount : item.count === "unread" ? unreadCount : 0;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`nav-link ${active ? "active" : ""}`}
      data-testid={`link-${item.label.toLowerCase().replaceAll(" ", "-")}`}
    >
      <Icon size={17} />
      <span>{item.label}</span>
      {count > 0 ? <b className="nav-count">{count}</b> : null}
    </Link>
  );
}

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-label">Espace client</div>
      <nav className="nav-stack">
        {CLIENT_NAV.map((item) => (
          <NavLink key={item.href} item={item} onNavigate={onNavigate} />
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-foot">
        <div className="client-chip">
          <div className="avatar">{CLIENT.initials}</div>
          <div>
            <strong>{CLIENT.name}</strong>
            <span>Client depuis 2023</span>
          </div>
        </div>
        <Link
          href="/login"
          className="nav-link"
          data-testid="link-deconnexion"
        >
          <LogOut size={17} />
          <span>Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
}
