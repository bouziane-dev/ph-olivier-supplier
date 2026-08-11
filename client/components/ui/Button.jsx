import Link from "next/link";

const VARIANTS = {
  primary: "button-primary",
  secondary: "button-secondary",
  orange: "button-orange",
  danger: "button-danger",
  ghost: "button-ghost",
};

export default function Button({
  variant = "primary",
  as: As = "button",
  href,
  className = "",
  type,
  ...props
}) {
  const cls = `button ${VARIANTS[variant]} ${className}`.trim();

  if (As === "a" || href) {
    if (href) {
      return (
        <Link href={href} className={cls} {...props}>
          {props.children}
        </Link>
      );
    }
    return (
      <a className={cls} {...props}>
        {props.children}
      </a>
    );
  }

  return (
    <button type={type || "button"} className={cls} {...props}>
      {props.children}
    </button>
  );
}
