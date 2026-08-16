const P = (id, name, detail, category, price, stock, art) => ({
  id,
  name,
  detail,
  category,
  price,
  stock,
  art,
});

export const PRODUCTS = [
  P("p1", "Doliprane 1000 mg", "Boîte de 8 comprimés", "Médicaments", 185, "Disponible", "art-blue"),
  P("p2", "A-Derma Exomega", "Crème émolliente 200 ml", "Dermocosmétique", 1680, "Disponible", "art-mint"),
  P("p3", "Biafine Émulsion", "Tube de 93 g", "Parapharmacie", 920, "Stock limité", "art-coral"),
  P("p4", "Aciclovir 200 mg", "Boîte de 25 comprimés", "Médicaments", 1200, "Disponible", "art-lilac"),
  P("p5", "Cicalfate+ Avène", "Crème réparatrice 40 ml", "Dermocosmétique", 1540, "Disponible", "art-mint"),
  P("p6", "Physiomer Hygiène", "Spray nasal 135 ml", "Parapharmacie", 1100, "Disponible", "art-blue"),
  P("p7", "Magné B6", "Boîte de 60 comprimés", "Parapharmacie", 980, "Stock limité", "art-coral"),
  P("p8", "Mustela Hydra Bébé", "Lait corps 300 ml", "Bébé", 1890, "Disponible", "art-lilac"),
  P("p9", "Efferalgan Vitamine C", "Boîte de 16 comprimés", "Médicaments", 740, "Disponible", "art-blue"),
  P("p10", "La Roche-Posay Anthelios", "Fluide SPF50+ 50 ml", "Dermocosmétique", 2600, "En arrivée", "art-mint"),
  P("p11", "Bétadine dermique", "Flacon 125 ml", "Parapharmacie", 890, "Disponible", "art-coral"),
  P("p12", "Vichy Dercos Shampooing", "Anti-chute 200 ml", "Parapharmacie", 2140, "Disponible", "art-lilac"),
  P("p13", "Abufene 400 mg", "Boîte de 20 comprimés", "Médicaments", 320, "Disponible", "art-blue"),
  P("p14", "Aciclovir sirop 200 mg/5 ml", "Flacon de 120 ml", "Médicaments", 780, "Stock limité", "art-mint"),
  P("p15", "Aciclovir 250 mg inj", "Boîte de 5 ampoules", "Médicaments", 1450, "Disponible", "art-lilac"),
  P("p16", "Aciclovir 500 mg inj", "Boîte de 5 ampoules", "Médicaments", 2100, "Disponible", "art-blue"),
  P("p17", "Aldara 5% crm", "Boîte de 12 sachets", "Parapharmacie", 4600, "En arrivée", "art-coral"),
  P("p18", "Inexium 40 mg", "Boîte de 28 comprimés", "Médicaments", 3350, "Disponible", "art-lilac"),
];

export const CATEGORIES = [
  "Toutes les catégories",
  "Médicaments",
  "Dermocosmétique",
  "Bébé",
  "Parapharmacie",
];

export const AVAILABILITY = [
  "Tous les stocks",
  "Disponibles",
  "Stock limité",
  "En arrivée",
  "Rupture",
];

export const SORTS = ["Pertinence", "Alphabétique", "Prix croissant", "Prix décroissant"];

export const STOCK_CLASS = {
  Disponible: "stock-ok",
  "Stock limité": "stock-low",
  Rupture: "stock-out",
  "En arrivée": "stock-arrival",
};

const line = (productId, quantity) => {
  const p = PRODUCTS.find((x) => x.id === productId);
  return { ...p, quantity };
};

const order = (id, date, status, lines, extra = {}) => {
  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  return { id, date, status, total, lines, eta: "Livraison estimée sous 24 h", ...extra };
};

export const INITIAL_ORDERS = [
  order(
    "#ADL-5201",
    "11/08/2026 à 09:15",
    "En attente",
    [line("p1", 3), line("p9", 2), line("p14", 1)]
  ),
  order(
    "#ADL-3955",
    "11/08/2026 à 16:39",
    "En attente",
    [line("p2", 3), line("p3", 2), line("p1", 2)],
    { eta: "Livraison estimée demain" }
  ),
  order("#ADL-3100", "05/08/2026 à 11:20", "Confirmée", [line("p13", 5), line("p18", 2)]),
  order("#ADL-2061", "09/07/2026 à 21:15", "Livrée", [line("p9", 2), line("p5", 5)]),
  order("#ADL-1280", "28/06/2026 à 08:45", "Annulée", [line("p12", 4), line("p6", 3)], {
    note: "Commande annulée.",
  }),
  order("#ADL-560", "06/06/2026 à 18:11", "Livrée", [line("p8", 4), line("p7", 4)]),
  order("#ADL-174", "30/05/2026 à 18:21", "Annulée", [line("p4", 10)]),
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "order",
    title: "Commande #ADL-5201 reçue",
    message:
      "Votre commande a bien été enregistrée et est en attente de confirmation.",
    time: "Aujourd'hui à 09:15",
    read: false,
  },
  {
    id: "n2",
    type: "order",
    title: "Commande #ADL-3955 reçue",
    message: "Votre commande est en attente de confirmation. Livraison estimée demain.",
    time: "Il y a 18 minutes",
    read: false,
  },
  {
    id: "n3",
    type: "stock",
    title: "Arrivage signalé : Anthelios SPF50+",
    message: "Le produit La Roche-Posay Anthelios sera disponible vendredi.",
    time: "Hier à 09:12",
    read: false,
  },
  {
    id: "n4",
    type: "truck",
    title: "Commande #ADL-2061 livrée",
    message: "Votre commande a été livrée dans votre officine.",
    time: "09/07/2026 à 21:15",
    read: true,
  },
  {
    id: "n5",
    type: "order",
    title: "Commande #ADL-560 livrée",
    message: "Votre commande a été livrée dans votre officine. Bonne journée !",
    time: "08/06/2026 à 10:30",
    read: true,
  },
  {
    id: "n6",
    type: "account",
    title: "Encours proche du plafond",
    message: "Votre encours atteint 118 400 DA sur les 120 000 DA autorisés.",
    time: "01/08/2026 à 15:00",
    read: true,
  },
  {
    id: "n7",
    type: "catalog",
    title: "Nouveautés au catalogue",
    message: "Efferalgan Vitamine C et Aciclovir sirop sont disponibles.",
    time: "28/07/2026 à 11:00",
    read: true,
  },
  {
    id: "n8",
    type: "account",
    title: "Bienvenue dans votre espace",
    message:
      "Votre compte professionnel ADLENE est prêt. Commandez dès aujourd'hui.",
    time: "15/01/2026 à 10:00",
    read: true,
  },
];

export const ADMIN_PRODUCTS = PRODUCTS.map((p, i) => ({
  ...p,
  code: `ADL-${String(i + 1).padStart(4, "0")}`,
  stockQty: p.stock === "Rupture" ? 0 : p.stock === "Stock limité" ? [8, 12, 15][i % 3] : 60 + ((i * 37) % 220),
  updated: ["11/08/2026", "10/08/2026", "09/08/2026"][i % 3],
}));

export const ADMIN_CLIENTS = [
  { id: "PH-00482", name: "Pharmacie Nadjet", zone: "Alger Centre", phone: "021 63 48 19", encours: 118400, status: "Actif", lastOrder: "11/08/2026" },
  { id: "PH-01127", name: "Pharmacie El Badr", zone: "Bab El Oued", phone: "021 52 71 36", encours: 42000, status: "Actif", lastOrder: "09/08/2026" },
  { id: "PH-00893", name: "Pharmacie du Littoral", zone: "Bordj El Kiffan", phone: "023 81 44 12", encours: 0, status: "Suspendu", lastOrder: "27/07/2026" },
  { id: "PH-01455", name: "Pharmacie des Oliviers", zone: "Kouba", phone: "021 28 90 74", encours: 61200, status: "Actif", lastOrder: "05/08/2026" },
  { id: "PH-00310", name: "Pharmacie El Yasmine", zone: "Bir Mourad Raïs", phone: "023 44 18 66", encours: 24800, status: "Actif", lastOrder: "02/08/2026" },
  { id: "PH-01602", name: "Pharmacie Tassili", zone: "Tizi Ouzou", phone: "026 21 35 08", encours: 8400, status: "Actif", lastOrder: "31/07/2026" },
  { id: "PH-00944", name: "Pharmacie Annaba Santé", zone: "Annaba", phone: "038 87 22 10", encours: 17600, status: "Actif", lastOrder: "29/07/2026" },
  { id: "PH-00218", name: "Pharmacie de l'Étoile", zone: "Hydra", phone: "023 18 55 47", encours: 9300, status: "En attente", lastOrder: "22/07/2026" },
];

export const ADMIN_STATS = [
  { label: "Chiffre d'affaires du mois", value: "1 284 600 DA", trend: "+12,4%", up: true, icon: "euro" },
  { label: "Commandes ce mois", value: "342", trend: "+8", up: true, icon: "orders" },
  { label: "Nouveaux clients", value: "12", trend: "+4", up: true, icon: "clients" },
  { label: "Taux de service", value: "97,8%", trend: "-0,6%", up: false, icon: "service" },
];

export const ADMIN_WEEK = [
  { day: "Jeu", value: 38 },
  { day: "Ven", value: 46 },
  { day: "Sam", value: 42 },
  { day: "Dim", value: 55 },
  { day: "Lun", value: 49 },
  { day: "Mar", value: 61 },
  { day: "Mer", value: 58 },
];

export const ADMIN_TOP_PRODUCTS = [
  { name: "Doliprane 1000 mg", units: "1 240 unités", rank: 1 },
  { name: "A-Derma Exomega", units: "860 unités", rank: 2 },
  { name: "Efferalgan Vitamine C", units: "730 unités", rank: 3 },
  { name: "Magné B6", units: "510 unités", rank: 4 },
  { name: "Vichy Dercos Shampooing", units: "420 unités", rank: 5 },
];

export const CLIENT = {
  initials: "PN",
  name: "Pharmacie Nadjet",
  shortName: "Nadjet B.",
  role: "Client professionnel à Alger centre",
  email: "pharmacie.nadjet@email.dz",
  id: "ADL-00482",
  lastOrder: "11/08/2026",
  commercial: "Meriem K.",
  address: "18 rue Didouche Mourad, Alger 16000",
  phone: "021 63 48 19",
  hours: "Dim – Jeu : 08:30 – 16:30",
  nif: "000016160482",
  credit: 120000,
  paymentTerms: "30 jours fin de mois",
  minOrder: 5000,
};
