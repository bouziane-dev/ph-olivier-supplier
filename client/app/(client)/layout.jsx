"use client";

import { StoreProvider } from "@/components/store";
import AppShell from "@/components/layout/AppShell";

export default function ClientLayout({ children }) {
  return (
    <StoreProvider>
      <AppShell>{children}</AppShell>
    </StoreProvider>
  );
}
