"use client";

import Link from "next/link";
import { Plus, ChevronRight, Package } from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { OrderStatusBadge } from "@/components/ui/StatusBadge";
import { formatDA } from "@/lib/format";

export default function OrdersPage() {
  const { orders, hydrated } = useStore();

  return (
    <>
      <PageHeader
        eyebrow="Suivi logistique"
        title="Mes commandes"
        description="Chaque commande, de la validation à la livraison dans votre officine."
        action={
          <Link href="/" className="button button-primary" data-testid="link-order-catalog">
            <Plus size={15} />
            Nouvelle commande
          </Link>
        }
      />

      {!hydrated ? null : orders.length === 0 ? (
        <EmptyState
          icon={<Package size={22} />}
          title="Aucune commande pour le moment"
          description="Vos commandes apparaîtront ici dès la première validation du panier."
          action={
            <Link href="/" className="button button-primary">
              Parcourir le catalogue
            </Link>
          }
        />
      ) : (
        <div className="surface table-surface">
          <table className="data-table">
            <thead>
              <tr>
                <th>N° commande</th>
                <th>Date</th>
                <th>Total</th>
                <th>Statut</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} data-testid={`row-order-${order.id}`}>
                  <td data-label="Commande">
                    <strong className="mono">{order.id}</strong>
                  </td>
                  <td data-label="Date">{order.date}</td>
                  <td data-label="Total">
                    <strong className="mono" style={{ color: "hsl(25 79% 49%)" }}>
                      {formatDA(order.total)}
                    </strong>
                  </td>
                  <td data-label="Statut">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td data-label="Action" style={{ textAlign: "right" }}>
                    <Link
                      href={`/orders/${encodeURIComponent(order.id)}`}
                      className="button button-secondary"
                      style={{ display: "inline-flex" }}
                      data-testid={`button-order-detail-${order.id}`}
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
      )}
    </>
  );
}
