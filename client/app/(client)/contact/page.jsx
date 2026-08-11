"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { CLIENT } from "@/lib/data";

const CARDS = [
  {
    icon: Phone,
    title: "Appelez-nous",
    text: "Un conseiller vous répond directement pour les demandes urgentes.",
    value: "021 63 48 19",
  },
  {
    icon: Mail,
    title: "Écrivez-nous",
    text: "Pour une demande détaillée, envoyez-nous un message à tout moment.",
    value: "bonjour@adlene.dz",
  },
  {
    icon: MapPin,
    title: "Notre dépôt",
    text: "Retrait et accueil professionnel sur rendez-vous, du dimanche au jeudi.",
    value: "Zone industrielle, Rouiba",
  },
  {
    icon: Clock,
    title: "Horaires support",
    text: "Dimanche – Jeudi, 08:00 – 17:00.",
    value: "Réponse sous 2 heures",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    subject: "Question concernant une commande",
    email: CLIENT.email,
    message: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setSent(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Nous sommes là"
        title="Besoin d'un coup de main ?"
        description="Une question sur une référence, une livraison ou votre compte ? Notre équipe vous répond pendant les horaires d'ouverture."
      />

      <div className="contact-grid">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="surface contact-card">
              <div className="contact-icon">
                <Icon size={19} />
              </div>
              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className="contact-value">{card.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <section className="surface contact-form">
        {sent ? (
          <div className="notice">
            <CheckCircle2 size={17} />
            Votre message a bien été envoyé. Meriem reviendra vers vous
            rapidement.
          </div>
        ) : (
          <form onSubmit={submit}>
            <h2 className="profile-section-title">Envoyer un message</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="subject">Sujet</label>
                <select
                  id="subject"
                  className="select-control"
                  value={form.subject}
                  onChange={update("subject")}
                  data-testid="input-contact-subject"
                >
                  <option>Question concernant une commande</option>
                  <option>Demande de renseignement produit</option>
                  <option>Problème de facturation</option>
                  <option>Demande commerciale</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="reply">Votre e-mail</label>
                <input
                  id="reply"
                  className="text-input"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  data-testid="input-contact-email"
                />
              </div>
              <div className="field full">
                <label htmlFor="message">Votre message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="textarea-input"
                  placeholder="Décrivez votre demande..."
                  value={form.message}
                  onChange={update("message")}
                  data-testid="input-contact-message"
                  required
                />
              </div>
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" data-testid="button-send-message">
                <Send size={15} />
                Envoyer le message
              </Button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}
