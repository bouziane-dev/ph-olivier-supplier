import { Plus, Pill } from "lucide-react";
import { formatDA } from "@/lib/format";
import { STOCK_CLASS } from "@/lib/data";

export default function ProductCard({ product, onAdd, index = 0, loading }) {
  const out = product.stock === "Rupture";

  if (loading) {
    return (
      <div className="product-card" aria-hidden="true">
        <div className="skeleton" style={{ height: 94, borderRadius: 12 }} />
        <div className="skeleton" style={{ height: 10, width: "40%", marginTop: 14 }} />
        <div className="skeleton" style={{ height: 18, width: "80%", marginTop: 12 }} />
        <div className="skeleton" style={{ height: 12, width: "55%", marginTop: 8 }} />
        <div className="skeleton" style={{ height: 12, width: "30%", marginTop: 20 }} />
      </div>
    );
  }

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
      data-testid={`card-product-${product.id}`}
    >
      <div className={`product-art ${product.art}`}>
        <Pill size={40} strokeWidth={1.6} />
        <span className="art-watermark">PHARMA</span>
      </div>
      <div className="product-meta">
        <span className="category-tag">{product.category}</span>
        <span className={`stock-tag ${STOCK_CLASS[product.stock] || "stock-out"}`}>
          <i className="stock-dot" />
          {product.stock}
        </span>
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-sub">{product.detail}</p>
      <div className="product-footer">
        <span className="price">{formatDA(product.price)}</span>
        <button
          className="add-button"
          onClick={() => onAdd(product)}
          disabled={out}
          data-testid={`button-add-${product.id}`}
          aria-label={`Ajouter ${product.name}`}
          title={out ? "Épuisé" : "Ajouter au panier"}
        >
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
}
