"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingCart,
  Package,
  Clock3,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { CLIENT } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(CLIENT.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    if (password.length < 4) {
      setError("Votre mot de passe doit contenir au moins 4 caractères.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <aside className="auth-side">
          <Link href="/" className="brand">
            <div className="brand-mark">
              <Plus size={19} strokeWidth={3} />
            </div>
            <div className="brand-copy">
              <div className="brand-name">ADLENE</div>
              <div className="brand-sub">Parapharm</div>
            </div>
          </Link>

          <h2>Le stock, sans détour.</h2>
          <p className="tagline">
            Votre plateforme de réassort pour la pharmacie et la parapharmacie.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <span>
                <ShoppingCart size={13} />
              </span>
              Catalogue 24/7 et commande en quelques clics
            </div>
            <div className="auth-feature">
              <span>
                <Package size={13} />
              </span>
              Suivi de commande et notifications en temps réel
            </div>
            <div className="auth-feature">
              <span>
                <Clock3 size={13} />
              </span>
              Livraison estimée sous 24 h dans votre officine
            </div>
          </div>

          <div className="auth-stat">
            <div>
              <b>184</b>
              <span>Références</span>
            </div>
            <div>
              <b>97,8%</b>
              <span>Taux de service</span>
            </div>
            <div>
              <b>24h</b>
              <span>Livraison</span>
            </div>
          </div>
        </aside>

        <div className="auth-main">
          <form className="auth-form" onSubmit={submit}>
            <div className="eyebrow">Espace client</div>
            <h1 className="auth-form-title">Connexion</h1>
            <p className="auth-form-sub">
              Accédez à votre compte professionnel.
            </p>

            {error ? (
              <div
                style={{
                  color: "#c2341e",
                  background: "#fbe8e5",
                  borderRadius: 11,
                  padding: "11px 13px",
                  fontSize: 11,
                  fontWeight: 600,
                  marginBottom: 15,
                }}
                role="alert"
              >
                {error}
              </div>
            ) : null}

            <div className="auth-field">
              <label htmlFor="login-email">Adresse e-mail</label>
              <div className="input-wrap">
                <Mail size={15} />
                <input
                  id="login-email"
                  className="text-input"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@officine.dz"
                  data-testid="input-login-email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Mot de passe</label>
              <div className="input-wrap">
                <Lock size={15} />
                <input
                  id="login-password"
                  className="text-input has-toggle"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-login-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Se souvenir de moi
              </label>
              <a className="auth-link" href="#" onClick={(e) => e.preventDefault()}>
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="button button-primary"
              style={{ width: "100%" }}
              disabled={loading}
              data-testid="button-login"
            >
              <LogIn size={15} />
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <div className="auth-foot">
              Vous n'avez pas de compte ?{" "}
              <a className="auth-link" href="#" onClick={(e) => e.preventDefault()}>
                Contactez votre commercial
              </a>
              <br />
              <Link className="auth-link" href="/admin">
                Espace fournisseur (admin)
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
