"use client";

import { useMemo, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { OrderStatusBadge } from "@/components/ui/StatusBadge";
import { formatDA } from "@/lib/format";
import { INITIAL_ORDERS } from "@/lib/data";

const STATUSES = [
  "Tous les statuts",
  "En attente",
  "Confirmée",
  "Livrée",
  "Annulée",
];

export default function AdminOrders() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(STATUSES[0]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INITIAL_ORDERS.filter((o) => {
      const matchesQuery = !q || o.id.toLowerCase().includes(q);
      const matchesStatus = status === STATUSES[0] || o.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <>
      <PageHeader
        eyebrow="Gestion des commandes"
        title="Commandes clients"
        description="Suivez le cycle complet des commandes, de la réception à la livraison."
      />

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={16} />
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une commande..."
          />
        </div>
        <select
          className="select-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="surface table-surface">
        <table className="data-table">
          <thead>
            <tr>
              <th>N° commande</th>
              <th>Client</th>
              <th>Date</th>
              <th>Références</th>
              <th>Montant</th>
              <th>Statut</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id}>
                <td data-label="N° commande">
                  <strong className="mono">{o.id}</strong>
                </td>
                <td data-label="Client">Pharmacie Nadjet</td>
                <td data-label="Date">{o.date}</td>
                <td data-label="Références">{o.lines.length}</td>
                <td data-label="Montant">
                  <strong className="mono" style={{ color: "hsl(25 79% 49%)" }}>
                    {formatDA(o.total)}
                  </strong>
                </td>
                <td data-label="Statut">
                  <OrderStatusBadge status={o.status} />
                </td>
                <td data-label="Action" style={{ textAlign: "right" }}>
                  <Link
                    href="/admin/orders"
                    className="button button-secondary"
                    style={{ display: "inline-flex" }}
                  >
                    Voir le détail
                    <ChevronRight size={13} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
