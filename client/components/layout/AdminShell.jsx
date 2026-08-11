"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Package,
  Users,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Brand from "./Brand";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Produits", icon: Boxes },
  { href: "/admin/orders", label: "Commandes", icon: Package },
  { href: "/admin/clients", label: "Clients", icon: Users },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const current =
    ADMIN_NAV.find((n) =>
      n.exact ? pathname === n.href : pathname.startsWith(n.href)
    ) || ADMIN_NAV[0];

  return (
    <div className="app-shell">
      <div className="app-layout">
        <aside className="sidebar">
          <Brand href="/admin" />
          <div className="sidebar-label">Administration</div>
          <nav className="nav-stack">
            {ADMIN_NAV.map((item) => {
              const active =
                item.exact ? pathname === item.href : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${active ? "active" : ""}`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="sidebar-spacer" />
          <div className="sidebar-foot">
            <div className="client-chip">
              <div className="avatar">AD</div>
              <div>
                <strong>ADLENE</strong>
                <span>Service fournisseur</span>
              </div>
            </div>
            <Link href="/login" className="nav-link">
              <LogOut size={17} />
              <span>Déconnexion</span>
            </Link>
          </div>
        </aside>

        <div className="content">
          <header className="topbar">
            <div className="crumb">
              Administration
              <ChevronRight size={12} />
              <strong>{current.label}</strong>
            </div>
            <div className="topbar-client">
              <div className="avatar">AD</div>
              <span style={{ fontSize: 12, fontWeight: 700 }}>Adm. ADLENE</span>
            </div>
          </header>
          <main className="main">{children}</main>
        </div>
      </div>
    </div>
  );
}
