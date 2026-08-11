"use client";

import { useState } from "react";
import { Pencil, CreditCard } from "lucide-react";
import { useStore } from "@/components/store";
import PageHeader from "@/components/ui/PageHeader";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { formatDA } from "@/lib/format";
import { CLIENT } from "@/lib/data";

export default function ProfilePage() {
  const { showToast } = useStore();
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [form, setForm] = useState({
    name: CLIENT.name,
    shortName: CLIENT.shortName,
    email: CLIENT.email,
    phone: CLIENT.phone,
    address: CLIENT.address,
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = () => {
    setEditOpen(false);
    showToast("Informations mises à jour");
  };

  return (
    <>
      <PageHeader
        eyebrow="Votre compte professionnel"
        title="Mon profil"
        description="Les informations de la Pharmacie Nadjet utilisées pour vos commandes et vos factures."
        action={
          <Button variant="secondary" onClick={() => setEditOpen(true)} data-testid="button-edit-profile">
            <Pencil size={15} />
            Modifier les informations
          </Button>
        }
      />

      <div className="profile-grid">
        <section className="surface profile-card profile-hero">
          <div className="profile-avatar">{CLIENT.initials}</div>
          <h2>{CLIENT.name}</h2>
          <p>{CLIENT.role}</p>
        </section>

        <section className="surface profile-card">
          <h2 className="profile-section-title">Compte client</h2>
          <div className="info-grid">
            <div>
              <div className="info-label">Identifiant</div>
              <div className="info-value mono">{CLIENT.id}</div>
            </div>
            <div>
              <div className="info-label">Statut</div>
              <div className="info-value">
                <span className="status status-green">
                  <i className="stock-dot" />
                  Compte actif
                </span>
              </div>
            </div>
            <div>
              <div className="info-label">Dernière commande</div>
              <div className="info-value">{CLIENT.lastOrder}</div>
            </div>
            <div>
              <div className="info-label">Commerciale dédiée</div>
              <div className="info-value">{CLIENT.commercial}</div>
            </div>
          </div>
        </section>

        <section className="surface profile-card">
          <h2 className="profile-section-title">Coordonnées de livraison</h2>
          <div className="info-grid">
            <div>
              <div className="info-label">Adresse</div>
              <div className="info-value">
                {CLIENT.address.split(", ")[0]}
                <br />
                {CLIENT.address.split(", ").slice(1).join(", ")}
              </div>
            </div>
            <div>
              <div className="info-label">Téléphone</div>
              <div className="info-value">{CLIENT.phone}</div>
            </div>
            <div>
              <div className="info-label">E-mail</div>
              <div className="info-value">{CLIENT.email}</div>
            </div>
            <div>
              <div className="info-label">NIF</div>
              <div className="info-value mono">{CLIENT.nif}</div>
            </div>
          </div>
        </section>

        <section className="surface profile-card">
          <h2 className="profile-section-title">Conditions commerciales</h2>
          <div className="credit-box">
            <div>
              <span>Encours autorisé</span>
              <strong>{formatDA(CLIENT.credit)}</strong>
            </div>
            <CreditCard size={25} color="hsl(var(--primary))" />
          </div>
          <div className="info-grid" style={{ marginTop: 20 }}>
            <div>
              <div className="info-label">Délai de paiement</div>
              <div className="info-value">{CLIENT.paymentTerms}</div>
            </div>
            <div>
              <div className="info-label">Minimum de commande</div>
              <div className="info-value">{formatDA(CLIENT.minOrder)}</div>
            </div>
          </div>
        </section>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Modifier les informations">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="pf-name">Raison sociale</label>
            <input id="pf-name" className="text-input" value={form.name} onChange={update("name")} />
          </div>
          <div className="field">
            <label htmlFor="pf-short">Nom du contact</label>
            <input id="pf-short" className="text-input" value={form.shortName} onChange={update("shortName")} />
          </div>
          <div className="field">
            <label htmlFor="pf-email">E-mail</label>
            <input id="pf-email" className="text-input" type="email" value={form.email} onChange={update("email")} />
          </div>
          <div className="field">
            <label htmlFor="pf-phone">Téléphone</label>
            <input id="pf-phone" className="text-input" value={form.phone} onChange={update("phone")} />
          </div>
          <div className="field full">
            <label htmlFor="pf-address">Adresse</label>
            <input id="pf-address" className="text-input" value={form.address} onChange={update("address")} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 9, marginTop: 18 }}>
          <Button variant="secondary" onClick={() => setEditOpen(false)}>
            Annuler
          </Button>
          <Button onClick={save}>Enregistrer</Button>
        </div>
      </Modal>
    </>
  );
}
