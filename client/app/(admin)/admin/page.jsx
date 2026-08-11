"use client";

import Link from "next/link";
import {
  Euro,
  Package,
  Users,
  HeartPulse,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { OrderStatusBadge } from "@/components/ui/StatusBadge";
import { formatDA } from "@/lib/format";
import {
  ADMIN_STATS,
  ADMIN_WEEK,
  ADMIN_TOP_PRODUCTS,
  INITIAL_ORDERS,
} from "@/lib/data";

const STAT_ICON = {
  euro: Euro,
  orders: Package,
  clients: Users,
  service: HeartPulse,
};

const STAT_ICON_CLASS = {
  euro: "",
  orders: "orange",
  clients: "blue",
  service: "green",
};

const MAX_BAR = Math.max(...ADMIN_WEEK.map((d) => d.value));

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Vue d'ensemble"
        title="Bonjour, équipe ADLENE"
        description="Le point sur l'activité de réassort et la satisfaction des pharmacies partenaires."
        action={
          <Link href="/admin/orders" className="button button-secondary">
            Toutes les commandes
            <ArrowRight size={14} />
          </Link>
        }
      />

      <div className="stat-grid">
        {ADMIN_STATS.map((stat) => {
          const Icon = STAT_ICON[stat.icon] || Euro;
          return (
            <div key={stat.label} className="surface stat-card">
              <div className="stat-card-head">
                <div className={`stat-icon ${STAT_ICON_CLASS[stat.icon]}`}>
                  <Icon size={18} />
                </div>
                <span className={`stat-trend ${stat.up ? "up" : "down"}`}>
                  {stat.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {stat.trend}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="admin-layout">
        <section className="surface admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="order-card-title">Commandes — 7 derniers jours</h2>
            <span className="status status-teal">
              <i className="stock-dot" />
              +18%
            </span>
          </div>
          <div className="bars">
            {ADMIN_WEEK.map((d) => (
              <div
                key={d.day}
                className="bar"
                style={{ height: `${Math.max(6, (d.value / MAX_BAR) * 100)}%` }}
                title={`${d.day} : ${d.value} commandes`}
              />
            ))}
          </div>
          <div className="bar-labels">
            {ADMIN_WEEK.map((d) => (
              <span key={d.day}>{d.day}</span>
            ))}
          </div>
        </section>

        <section className="surface admin-card">
          <h2 className="order-card-title">Top produits du mois</h2>
          <div style={{ marginTop: 12 }}>
            {ADMIN_TOP_PRODUCTS.map((p) => (
              <div key={p.name} className="top-product">
                <div className={`rank ${p.rank === 1 ? "first" : ""}`}>{p.rank}</div>
                <div>
                  <strong>{p.name}</strong>
                  <span>Référence best-seller</span>
                </div>
                <span className="units">{p.units}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="surface table-surface" style={{ marginTop: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px 0" }}>
          <h2 className="order-card-title">Dernières commandes</h2>
          <Link
            href="/admin/orders"
            className="button button-ghost"
            style={{ minHeight: 34, padding: "7px 12px" }}
          >
            Voir tout
            <ChevronRight size={13} />
          </Link>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>N° commande</th>
              <th>Client</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_ORDERS.slice(0, 5).map((o) => (
              <tr key={o.id}>
                <td data-label="N° commande">
                  <strong className="mono">{o.id}</strong>
                </td>
                <td data-label="Client">Pharmacie Nadjet</td>
                <td data-label="Date">{o.date}</td>
                <td data-label="Montant">
                  <strong className="mono" style={{ color: "hsl(25 79% 49%)" }}>
                    {formatDA(o.total)}
                  </strong>
                </td>
                <td data-label="Statut">
                  <OrderStatusBadge status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
