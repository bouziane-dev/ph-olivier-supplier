"use client";

import Link from "next/link";
import { ArrowLeft, Package, FileQuestion, MapPin, StickyNote } from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { OrderStatusBadge } from "@/components/ui/StatusBadge";
import OrderTimeline from "@/components/orders/OrderTimeline";
import { formatDA } from "@/lib/format";
import { CLIENT } from "@/lib/data";

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

  const deliveryLabel =
    order.delivery === "ramassage"
      ? "Ramassage au dépôt"
      : "Livraison à l'officine";

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
        <div>
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
                style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderRadius: 10, background: "#f5f5f5", fontSize: 12, color: "hsl(var(--muted-foreground))" }}
              >
                <StickyNote size={14} />
                {order.note}
              </div>
            ) : null}
          </section>

          <section className="surface order-card" style={{ marginTop: 18 }}>
            <h2 className="order-card-title">Articles commandés</h2>
            <div className="order-lines">
              {order.lines.map((line) => (
                <div key={line.id} className="order-line">
                  <div style={{ minWidth: 0 }}>
                    <b>{line.quantity} × </b>
                    <span>{line.name}</span>
                    <span style={{ display: "block", fontSize: 10, color: "hsl(var(--muted-foreground))", marginTop: 2 }}>
                      {line.detail} — {formatDA(line.price)} / u
                    </span>
                  </div>
                  <strong className="mono" style={{ whiteSpace: "nowrap", fontSize: 10 }}>
                    {formatDA(line.price * line.quantity)}
                  </strong>
                </div>
              ))}
            </div>
            <div className="summary-list" style={{ marginTop: 20 }}>
              <div className="summary-row">
                <span>Sous-total</span>
                <strong>{formatDA(order.total)}</strong>
              </div>
              <div className="summary-row">
                <span>Livraison</span>
                <strong style={{ color: "#2d9564" }}>Gratuite</strong>
              </div>
              <div className="summary-row summary-total">
                <span>Total TTC</span>
                <strong data-testid="text-order-total">{formatDA(order.total)}</strong>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <section className="surface order-card">
            <h2 className="order-card-title">Livraison</h2>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <MapPin size={15} color="hsl(var(--primary))" />
                <div>
                  <div className="info-label">Adresse</div>
                  <div className="info-value">{CLIENT.name}<br />{CLIENT.address}</div>
                </div>
              </div>
              <div style={{ marginTop: 4 }}>
                <div className="info-label">Mode</div>
                <div className="info-value">{deliveryLabel}</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div className="info-label">Réceptionnaire</div>
                <div className="info-value">{CLIENT.shortName}</div>
              </div>
              {order.eta ? (
                <div style={{ marginTop: 12 }}>
                  <div className="info-label">Estimation</div>
                  <div className="info-value">{order.eta}</div>
                </div>
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
