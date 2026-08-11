"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Truck,
  MapPin,
  Package,
  Store,
  CreditCard,
} from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import { formatDA } from "@/lib/format";
import { CLIENT } from "@/lib/data";

const DELIVERY_OPTIONS = [
  {
    id: "livraison",
    title: "Livraison à l'officine",
    subtitle: "Estimation sous 24 h — du dimanche au jeudi",
    price: 0,
    priceLabel: "Gratuite",
    icon: Truck,
  },
  {
    id: "ramassage",
    title: "Ramassage au dépôt",
    subtitle: "Zone industrielle, Rouiba — accueil professionnel",
    price: 0,
    priceLabel: "Gratuit",
    icon: Store,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    cartCount,
    placeOrder,
    clearCart,
    hydrated,
    showToast,
  } = useStore();
  const [delivery, setDelivery] = useState("livraison");
  const [notes, setNotes] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const confirm = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      const order = placeOrder(delivery, notes);
      setConfirmedOrder(order);
      setSubmitting(false);
      showToast("Commande confirmée avec succès");
    }, 500);
  };

  if (confirmedOrder) {
    return (
      <>
        <PageHeader
          eyebrow="Commande confirmée"
          title="Merci pour votre commande"
          action={
            <button
              className="button button-secondary"
              onClick={() => router.push("/")}
            >
              <ArrowLeft size={15} />
              Retour à la boutique
            </button>
          }
        />
        <div className="confirmation-card surface">
          <div className="confirmation-badge">
            <CheckCircle2 size={38} />
          </div>
          <h2>Commande {confirmedOrder.id} confirmée</h2>
          <p>
            Votre commande a bien été enregistrée. Notre équipe la prépare et
            vous recevrez une notification dès son expédition.
          </p>

          <div
            className="surface"
            style={{
              textAlign: "left",
              marginTop: 24,
              padding: "18px 20px",
              borderRadius: 14,
              borderColor: "hsl(var(--border))",
              boxShadow: "none",
            }}
          >
            <div className="summary-list">
              <div className="summary-row">
                <span>Numéro de commande</span>
                <strong className="mono">{confirmedOrder.id}</strong>
              </div>
              <div className="summary-row">
                <span>Date</span>
                <strong>{confirmedOrder.date}</strong>
              </div>
              <div className="summary-row">
                <span>Mode de livraison</span>
                <strong>
                  {delivery === "livraison" ? "Livraison à l'officine" : "Ramassage au dépôt"}
                </strong>
              </div>
              <div className="summary-row">
                <span>Références</span>
                <strong>{confirmedOrder.lines.length}</strong>
              </div>
              <div className="summary-row summary-total">
                <span>Total TTC</span>
                <strong style={{ color: "hsl(var(--primary))", fontFamily: "var(--app-font-mono)" }}>
                  {formatDA(confirmedOrder.total)}
                </strong>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link href="/orders" className="button button-primary">
              <Package size={15} />
              Suivre ma commande
            </Link>
            <Link href="/" className="button button-secondary">
              Retour à la boutique
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!hydrated) return null;

  if (cart.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart size={22} />}
        title="Votre panier est vide"
        description="Ajoutez des produits au panier avant de passer commande."
        action={
          <Link href="/" className="button button-primary">
            Parcourir le catalogue
          </Link>
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Finaliser la commande"
        title="Confirmation de commande"
        description="Vérifiez votre sélection, choisissez votre mode de livraison et validez."
        action={
          <button className="button button-secondary" onClick={() => router.push("/cart")}>
            <ArrowLeft size={15} />
            Retour au panier
          </button>
        }
      />

      <div className="checkout-layout">
        <div>
          <section className="surface checkout-card">
            <h2 className="order-card-title">Votre sélection ({cartCount})</h2>
            <div className="cart-list" style={{ margin: "0 -20px" }}>
              {cart.map((item) => (
                <div className="cart-item" key={item.id} style={{ gridTemplateColumns: "1fr 130px 115px" }}>
                  <div className="cart-product">
                    <div className={`mini-art ${item.art}`}>
                      <Package size={16} />
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.detail}</span>
                    </div>
                  </div>
                  <span className="cart-price">{formatDA(item.price)}</span>
                  <span className="qty-control">
                    <b
                      style={{
                        width: "100%",
                        textAlign: "center",
                        padding: "8px 0",
                        fontFamily: "var(--app-font-mono)",
                        fontSize: 11,
                      }}
                    >
                      × {item.quantity}
                    </b>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="surface checkout-card">
            <h2 className="order-card-title">Mode de livraison</h2>
            <div style={{ marginTop: 14 }}>
              {DELIVERY_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    className={`delivery-option ${delivery === opt.id ? "selected" : ""}`}
                    onClick={() => setDelivery(opt.id)}
                    role="radio"
                    aria-checked={delivery === opt.id}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setDelivery(opt.id)}
                  >
                    <div className="delivery-radio" />
                    <Icon size={18} color="hsl(var(--primary))" style={{ marginTop: 1 }} />
                    <div>
                      <strong>{opt.title}</strong>
                      <p>{opt.subtitle}</p>
                    </div>
                    <span className="delivery-price">{opt.priceLabel}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="surface checkout-card">
            <h2 className="order-card-title">Livraison</h2>
            <div className="info-grid" style={{ marginTop: 14 }}>
              <div>
                <div className="info-label">Adresse de livraison</div>
                <div className="info-value">
                  {CLIENT.name}
                  <br />
                  {CLIENT.address}
                </div>
              </div>
              <div>
                <div className="info-label">Réceptionnaire</div>
                <div className="info-value">{CLIENT.shortName}</div>
              </div>
              <div className="field full">
                <label htmlFor="checkout-notes">Note pour le préparateur (facultatif)</label>
                <textarea
                  id="checkout-notes"
                  className="textarea-input"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Indiquez une précaution particulière, un commentaire..."
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="summary-sticky">
          <section className="surface checkout-card">
            <h2 className="order-card-title">Récapitulatif</h2>
            <div className="summary-list" style={{ marginTop: 16 }}>
              <div className="summary-row">
                <span>Sous-total</span>
                <strong>{formatDA(cartTotal)}</strong>
              </div>
              <div className="summary-row">
                <span>Livraison</span>
                <strong style={{ color: "#2d9564" }}>Gratuite</strong>
              </div>
              <div className="summary-row checkout-total">
                <span>Total TTC</span>
                <strong>{formatDA(cartTotal)}</strong>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                padding: "11px 13px",
                borderRadius: 11,
                background: "#e9fbfa",
                fontSize: 11,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <CreditCard size={15} color="hsl(var(--primary))" />
              Réglé à 30 jours fin de mois — encours autorisé {formatDA(CLIENT.credit)}
            </div>

            <button
              className="button button-primary"
              style={{ width: "100%", marginTop: 18 }}
              onClick={confirm}
              disabled={submitting}
              data-testid="button-place-order"
            >
              {submitting ? "Enregistrement..." : "Confirmer la commande"}
              {!submitting && <ArrowRight size={15} />}
            </button>
            <button
              className="button button-secondary"
              style={{ width: "100%", marginTop: 10 }}
              onClick={() => router.push("/cart")}
            >
              <MapPin size={14} />
              Modifier le panier
            </button>
          </section>
        </aside>
      </div>
    </>
  );
}
