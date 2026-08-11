"use client";

import Link from "next/link";
import { ArrowLeft, Package, FileQuestion } from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { OrderStatusBadge } from "@/components/ui/StatusBadge";
import OrderTimeline from "@/components/orders/OrderTimeline";
import { formatDA } from "@/lib/format";

export default function OrderDetailPage({ params }) {
  const { id } = params;
  const { orders, hydrated } = useStore();

  if (!hydrated) return null;

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <EmptyState
        icon={<FileQuestion size={22} />}
        title="Commande introuvable"
        description="Cette commande n'existe pas ou a été retirée de votre historique."
        action={
          <Link href="/orders" className="button button-primary">
            Retour aux commandes
          </Link>
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`Commande ${order.id}`}
        title="Détail de la commande"
        action={
          <Link href="/orders" className="button button-secondary" data-testid="button-back-orders">
            <ArrowLeft size={15} />
            Retour aux commandes
          </Link>
        }
      />

      <div className="order-layout">
        <section className="surface order-card">
          <div className="order-card-head">
            <div>
              <h2 className="order-card-title">{order.id}</h2>
              <p className="order-card-sub">
                {order.date} — {order.lines.length} référence{order.lines.length > 1 ? "s" : ""}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <OrderTimeline status={order.status} eta={order.eta} startDate={order.date} />

          {order.note ? (
            <div
              className="notice"
              style={{ marginTop: 22, background: "#e9fbfa", color: "hsl(var(--muted-foreground))" }}
            >
              <Package size={16} />
              {order.note}
            </div>
          ) : null}
        </section>

        <aside className="surface order-card">
          <h2 className="order-card-title">Articles commandés</h2>
          <div className="order-lines">
            {order.lines.map((line) => (
              <div key={line.id} className="order-line">
                <span>
                  <b>
                    {line.quantity} ×{" "}
                  </b>
                  {line.name}
                </span>
                <strong className="mono" style={{ whiteSpace: "nowrap", fontSize: 10 }}>
                  {formatDA(line.price * line.quantity)}
                </strong>
              </div>
            ))}
          </div>
          <div className="summary-list" style={{ marginTop: 20 }}>
            <div className="summary-row summary-total">
              <span>Total de la commande</span>
              <strong data-testid="text-order-total">{formatDA(order.total)}</strong>
            </div>
          </div>

          {order.delivery ? (
            <div style={{ marginTop: 16 }}>
              <div className="info-label" style={{ marginBottom: 8 }}>
                Mode de livraison
              </div>
              <div className="info-value">
                {order.delivery === "ramassage"
                  ? "Ramassage au dépôt — Zone industrielle, Rouiba"
                  : "Livraison à l'officine — sous 24 h"}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
