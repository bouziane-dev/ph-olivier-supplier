"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { useStore } from "@/components/store";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileMenu from "./MobileMenu";

export default function AppShell({ children }) {
  const { toast } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="app-shell">
      <div className="app-layout">
        <Sidebar />
        <div className="content">
          <Topbar />
          <main className="main">{children}</main>
        </div>
      </div>
      <MobileMenu />
      {toast ? (
        <div className="toast" data-testid="toast-feedback">
          <Check size={16} color="hsl(var(--accent))" />
          {toast}
        </div>
      ) : null}
    </div>
  );
}
