"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import CartItemRow from "@/components/cart/CartItemRow";
import EmptyState from "@/components/ui/EmptyState";
import { formatDA } from "@/lib/format";

export default function CartPage() {
  const { cart, cartTotal, clearCart, hydrated } = useStore();

  return (
    <>
      <PageHeader
        eyebrow="Votre sélection"
        title="Mon panier"
        description={
          cart.length
            ? `${cart.length} référence${cart.length > 1 ? "s" : ""} prête${cart.length > 1 ? "s" : ""} à être commandée.`
            : "Votre panier est prêt pour votre prochaine sélection."
        }
        action={
          <Link href="/" className="button button-secondary" data-testid="link-back-catalog">
            <ArrowLeft size={15} />
            Continuer mes achats
          </Link>
        }
      />

      {!hydrated ? null : cart.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart size={22} />}
          title="Votre panier est vide"
          description="Les produits ajoutés depuis le catalogue apparaîtront ici. Commencez par vos indispensables du jour."
          action={
            <Link href="/" className="button button-primary" data-testid="link-empty-catalog">
              <ShoppingCart size={15} />
              Parcourir le catalogue
            </Link>
          }
        />
      ) : (
        <div className="surface table-surface">
          <div className="cart-list">
            {cart.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-bottom">
            <div>
              <span className="cart-total-label">Total estimé TTC</span>
              <strong className="cart-total" data-testid="text-cart-total">
                {formatDA(cartTotal)}
              </strong>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <button
                className="button button-danger"
                onClick={clearCart}
                data-testid="button-clear-cart"
              >
                <Trash2 size={15} />
                Vider le panier
              </button>
              <Link href="/checkout" className="button button-primary" data-testid="button-confirm-order">
                Passer la commande
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
