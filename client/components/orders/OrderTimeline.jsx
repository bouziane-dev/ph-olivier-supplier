const STEPS = [
  ["Commande reçue", ""],
  ["Préparation en cours", "Votre commande est préparée par notre équipe"],
  ["Expédition", "Bon de livraison en préparation"],
  ["Livraison confirmée", "À venir dans votre officine"],
];

const STEP_INDEX = {
  Nouvelle: 0,
  "En préparation": 1,
  Confirmée: 1,
  Fusionnée: 0,
  Expédiée: 2,
  Livrée: 3,
  Annulée: 0,
};

export default function OrderTimeline({ status, eta, startDate }) {
  const current = STEP_INDEX[status] ?? 0;

  return (
    <div className="timeline">
      {STEPS.map((step, index) => {
        const isDone = index < current;
        const isCurrent = index === current;
        const label =
          isCurrent && status === "En préparation" && eta ? eta : step[1];
        return (
          <div
            key={step[0]}
            className={`timeline-item ${isDone || isCurrent ? "done" : ""} ${isCurrent ? "current" : ""}`}
          >
            <i className="timeline-dot" />
            <strong>{step[0]}</strong>
            <span>
              {isCurrent && index === 0 && startDate ? startDate : label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
