import { Pill } from "lucide-react";
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
            <th style={{ textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td data-label="Produit">
                <strong>{p.name}</strong>
              </td>
              <td data-label="Prix">
                <strong className="mono" style={{ color: "#e06c1a" }}>
                  {formatDA(p.price)}
                </strong>
              </td>
              <td data-label="Disponibilité">
                <span className={`stock-tag ${STOCK_CLASS[p.stock] || "stock-out"}`}>
                  <i className="stock-dot" />
                  {p.stock}
                </span>
              </td>
              <td data-label="Action" style={{ textAlign: "right" }}>
                <button
                  className="button button-secondary"
                  onClick={() => onAdd(p)}
                  disabled={p.stock === "Rupture"}
                  style={{ display: "inline-flex" }}
                >
                  <Pill size={13} />
                  Ajouter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
