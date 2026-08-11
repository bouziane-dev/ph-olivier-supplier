"use client";

import { Minus, Plus, Pill, Trash2 } from "lucide-react";
import { formatDA } from "@/lib/format";
import { useStore } from "@/components/store";

export default function CartItemRow({ item }) {
  const { updateQuantity, removeFromCart } = useStore();

  return (
    <div className="cart-item" data-testid={`row-cart-${item.id}`}>
      <div className="cart-product">
        <div className={`mini-art ${item.art}`}>
          <Pill size={18} />
        </div>
        <div>
          <strong>{item.name}</strong>
          <span>{item.detail}</span>
        </div>
      </div>
      <span className="cart-price">{formatDA(item.price)}</span>
      <div className="qty-control">
        <button
          onClick={() => updateQuantity(item.id, -1)}
          aria-label={`Diminuer ${item.name}`}
          data-testid={`button-decrease-${item.id}`}
        >
          <Minus size={13} />
        </button>
        <span data-testid={`text-quantity-${item.id}`}>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, 1)}
          aria-label={`Augmenter ${item.name}`}
          data-testid={`button-increase-${item.id}`}
        >
          <Plus size={13} />
        </button>
      </div>
      <button
        className="remove-button"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Retirer ${item.name}`}
        title="Retirer du panier"
        data-testid={`button-remove-${item.id}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
