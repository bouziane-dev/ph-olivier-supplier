const STATUS_CLASS = {
  Nouvelle: "status-orange",
  "En préparation": "status-orange",
  Confirmée: "status-blue",
  Expédiée: "status-blue",
  Livrée: "status-green",
  Annulée: "status-red",
  Fusionnée: "status-gray",
};

export function OrderStatusBadge({ status, className = "" }) {
  return (
    <span className={`status ${STATUS_CLASS[status] || "status-gray"} ${className}`}>
      <i className="stock-dot" />
      {status}
    </span>
  );
}

export function StockBadge({ stock, className = "" }) {
  const cls = {
    Disponible: "status-green",
    "Stock limité": "status-orange",
    "En arrivée": "status-blue",
    Rupture: "status-red",
  }[stock] || "status-gray";

  return (
    <span className={`status ${cls} ${className}`}>
      <i className="stock-dot" />
      {stock}
    </span>
  );
}

export function ClientStatusBadge({ status }) {
  const cls = {
    Actif: "status-green",
    Suspendu: "status-red",
    "En attente": "status-orange",
  }[status] || "status-gray";
  return (
    <span className={`status ${cls}`}>
      <i className="stock-dot" />
      {status}
    </span>
  );
}
