export default function Skeleton({ className = "", style }) {
  return <div className={`skeleton ${className}`} style={style} />;
}

export function SkeletonText({ lines = 1 }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className=""
          style={{ height: 14, width: i === lines - 1 ? "55%" : "100%" }}
        />
      ))}
    </div>
  );
}
