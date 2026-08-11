"use client";

import { useMemo, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { ClientStatusBadge } from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { formatDA } from "@/lib/format";
import { ADMIN_CLIENTS } from "@/lib/data";

export default function AdminClients() {
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ADMIN_CLIENTS;
    return ADMIN_CLIENTS.filter(
      (c) =>
        `${c.name} ${c.zone} ${c.id}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Portefeuille pharmacies"
        title="Clients"
        description="Vos pharmacies partenaires, leurs encours et leur activité récente."
        action={
          <Button variant="primary">
            <UserPlus size={15} />
            Nouveau client
          </Button>
        }
      />

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={16} />
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une pharmacie..."
          />
        </div>
      </div>

      <div className="surface table-surface">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Zone</th>
              <th>Téléphone</th>
              <th>Encours</th>
              <th>Statut</th>
              <th>Dernière commande</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <td data-label="Client">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="avatar">{c.name.split(" ")[1]?.slice(0, 2) || "PH"}</div>
                    <div>
                      <strong>{c.name}</strong>
                      <span style={{ display: "block", fontSize: 10 }}>{c.id}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Zone">{c.zone}</td>
                <td data-label="Téléphone">{c.phone}</td>
                <td data-label="Encours">
                  <strong className="mono" style={{ color: "#e06c1a", fontSize: 12 }}>
                    {formatDA(c.encours)}
                  </strong>
                </td>
                <td data-label="Statut">
                  <ClientStatusBadge status={c.status} />
                </td>
                <td data-label="Dernière commande">{c.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
