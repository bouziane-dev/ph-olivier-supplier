import Link from "next/link";
import { Plus } from "lucide-react";

export default function Brand({ href = "/" }) {
  return (
    <Link href={href} className="brand" data-testid="link-brand">
      <div className="brand-mark">
        <Plus size={19} strokeWidth={3} />
      </div>
      <div className="brand-copy">
        <div className="brand-name">ADLENE</div>
        <div className="brand-sub">Parapharm</div>
      </div>
    </Link>
  );
}
