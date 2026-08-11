import { Bricolage_Grotesque, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata = {
  title: "ADLENE Parapharm",
  description:
    "Plateforme de commande en ligne pour les pharmacies partenaires. Le stock, sans détour.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${bricolage.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
