import { useState } from "react";
import { Pill, Minus, Plus } from "lucide-react";
import { formatDA } from "@/lib/format";
import { STOCK_CLASS } from "@/lib/data";

export default function ProductTable({ products, onAdd }) {
  return (
    <div className="surface table-surface">
      <table className="data-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Disponibilité</th>
            <th style={{ textAlign: "right" }}>Quantité</th>
            <th style={{ textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} onAdd={onAdd} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductRow({ product, onAdd }) {
  const [qty, setQty] = useState(1);
  const out = product.stock === "Rupture";

  return (
    <tr>
      <td data-label="Produit">
        <strong>{product.name}</strong>
      </td>
      <td data-label="Prix">
        <strong className="mono" style={{ color: "#e06c1a" }}>
          {formatDA(product.price)}
        </strong>
      </td>
      <td data-label="Disponibilité">
        <span className={`stock-tag ${STOCK_CLASS[product.stock] || "stock-out"}`}>
          <i className="stock-dot" />
          {product.stock}
        </span>
      </td>
      <td data-label="Quantité" style={{ textAlign: "right" }}>
        <div className="qty-control" style={{ margin: "0 0 0 auto" }}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={out}>
            <Minus size={13} />
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} disabled={out}>
            <Plus size={13} />
          </button>
        </div>
      </td>
      <td data-label="Action" style={{ textAlign: "right" }}>
        <button
          className="button button-secondary"
          onClick={() => { onAdd(product, qty); setQty(1); }}
          disabled={out}
          style={{ display: "inline-flex" }}
        >
          <Pill size={13} />
          Ajouter
        </button>
      </td>
    </tr>
  );
}
