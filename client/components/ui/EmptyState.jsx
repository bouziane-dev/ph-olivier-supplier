export default function EmptyState({ icon, title, description, action, className = "" }) {
  return (
    <div className={`empty-state surface ${className}`}>
      {icon ? <div className="empty-icon">{icon}</div> : null}
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}
