"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, RotateCcw } from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import {
  AVAILABILITY,
  CATEGORIES,
  PRODUCTS,
  SORTS,
} from "@/lib/data";

export default function CatalogPage() {
  const { addToCart, cartCount, hydrated } = useStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [availability, setAvailability] = useState(AVAILABILITY[0]);
  const [sort, setSort] = useState(SORTS[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchesQuery =
        !q || `${p.name} ${p.detail}`.toLowerCase().includes(q);
      const matchesCategory =
        category === CATEGORIES[0] || p.category === category;
      const matchesAvailability =
        availability === AVAILABILITY[0] || p.stock === availability;
      return matchesQuery && matchesCategory && matchesAvailability;
    });

    switch (sort) {
      case "Prix croissant":
        return [...list].sort((a, b) => a.price - b.price);
      case "Prix décroissant":
        return [...list].sort((a, b) => b.price - a.price);
      case "Alphabétique":
        return [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));
      default:
        return list;
    }
  }, [query, category, availability, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory(CATEGORIES[0]);
    setAvailability(AVAILABILITY[0]);
    setSort(SORTS[0]);
  };

  return (
    <>
      <PageHeader
        eyebrow="Bonjour Nadjet"
        title="Le stock, sans détour."
        description="Retrouvez vos références habituelles, vérifiez leur disponibilité et préparez votre prochaine livraison en quelques clics."
        action={
          <Link
            href="/cart"
            className="button button-primary"
            data-testid="link-open-cart"
          >
            <ShoppingCart size={15} />
            Voir le panier {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>
        }
      />

      <section className="catalog-banner">
        <strong>Les essentiels de votre officine</strong>
        <p>Une sélection pensée pour votre rythme de réassort quotidien.</p>
        <div className="banner-stat">
          <b>184</b>
          <span>références actives</span>
        </div>
      </section>

      <div className="toolbar">
        <div className="search-wrap">
          <Search size={16} />
          <input
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une référence, une marque..."
            data-testid="input-search-products"
          />
        </div>
        <select
          className="select-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-testid="select-category"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="select-control"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          data-testid="select-availability"
        >
          {AVAILABILITY.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <select
          className="select-control"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          data-testid="select-sort"
        >
          {SORTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          className="button button-secondary"
          onClick={resetFilters}
          data-testid="button-reset-filters"
        >
          <RotateCcw size={15} />
          Réinitialiser
        </button>
      </div>

      {filtered.length ? (
        <div className="catalog-grid">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
              index={index}
              loading={!hydrated}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search size={22} />}
          title="Aucune référence trouvée"
          description="Essayez un autre terme ou réinitialisez les filtres pour retrouver votre catalogue."
          action={
            <button
              className="button button-secondary"
              onClick={resetFilters}
              data-testid="button-empty-reset"
            >
              Réinitialiser les filtres
            </button>
          }
        />
      )}
    </>
  );
}
