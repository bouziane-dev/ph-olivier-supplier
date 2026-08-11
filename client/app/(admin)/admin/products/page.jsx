"use client";

import { useMemo, useState } from "react";
import { Search, Plus, RotateCcw } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { StockBadge } from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { formatDA } from "@/lib/format";
import { ADMIN_PRODUCTS, CATEGORIES, AVAILABILITY } from "@/lib/data";

export default function AdminProducts() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [availability, setAvailability] = useState(AVAILABILITY[0]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ADMIN_PRODUCTS.filter((p) => {
      const matchesQuery =
        !q ||
        `${p.name} ${p.detail} ${p.code}`.toLowerCase().includes(q);
      const matchesCategory =
        category === CATEGORIES[0] || p.category === category;
      const matchesAvailability =
        availability === AVAILABILITY[0] || p.stock === availability;
      return matchesQuery && matchesCategory && matchesAvailability;
    });
  }, [query, category, availability]);

  const reset = () => {
    setQuery("");
    setCategory(CATEGORIES[0]);
    setAvailability(AVAILABILITY[0]);
  };

  const stockLevel = (p) => {
    if (p.stock === "Rupture") return { cls: "out", pct: 0 };
    if (p.stock === "Stock limité") return { cls: "low", pct: 18 };
    if (p.stock === "En arrivée") return { cls: "low", pct: 35 };
    return { cls: "ok", pct: Math.min(95, 45 + p.stockQty * 0.2) };
  };

  return (
    <>
      <PageHeader
        eyebrow="Catalogue fournisseur"
        title="Produits"
        description="Gérez les références, les prix et la disponibilité du catalogue ADLENE."
        action={
          <Button variant="primary">
            <Plus size={15} />
            Nouveau produit
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
            placeholder="Rechercher un produit, un code..."
          />
        </div>
        <select
          className="select-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="select-control"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          {AVAILABILITY.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <button className="button button-secondary" onClick={reset}>
          <RotateCcw size={15} />
          Réinitialiser
        </button>
      </div>

      <div className="surface table-surface">
        <table className="data-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Code</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Disponibilité</th>
              <th>Stock</th>
              <th>Mis à jour</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => {
              const lvl = stockLevel(p);
              return (
                <tr key={p.id}>
                  <td data-label="Produit">
                    <strong>{p.name}</strong>
                  </td>
                  <td data-label="Code">
                    <span className="mono" style={{ fontSize: 11 }}>
                      {p.code}
                    </span>
                  </td>
                  <td data-label="Catégorie">{p.category}</td>
                  <td data-label="Prix">
                    <strong className="mono" style={{ color: "#e06c1a", fontSize: 12 }}>
                      {formatDA(p.price)}
                    </strong>
                  </td>
                  <td data-label="Disponibilité">
                    <StockBadge stock={p.stock} />
                  </td>
                  <td data-label="Stock">
                    <span className={`mini-stock ${lvl.cls}`}>
                      <span className="bar-track">
                        <span className="bar-fill" style={{ width: `${lvl.pct}%` }} />
                      </span>
                      {p.stock === "Rupture" ? "0" : p.stockQty}
                    </span>
                  </td>
                  <td data-label="Mis à jour">{p.updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
