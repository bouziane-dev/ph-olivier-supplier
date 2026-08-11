"use client";

import { NavLink, CLIENT_NAV } from "./Sidebar";

export default function MobileMenu({ onNavigate }) {
  const items = CLIENT_NAV.filter((item) =>
    ["/", "/cart", "/orders", "/notifications", "/profile"].includes(item.href)
  );

  return (
    <nav className="mobile-menu" aria-label="Navigation mobile">
      {items.map((item) => (
        <NavLink key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}
