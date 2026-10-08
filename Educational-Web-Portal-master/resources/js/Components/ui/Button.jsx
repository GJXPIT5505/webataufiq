import { Link } from "@inertiajs/react"; // Gunakan "<a>" jika tidak menggunakan Inertia React

const variantClasses = {
  gold: "bg-[#D4AF37] text-[#102380] hover:bg-[#D4AF37]/90",
  outline: "border border-white text-white hover:bg-white/10",
  "outline-navy": "border border-[#102380] text-[#102380] hover:bg-[#102380]/5",
  navy: "bg-[#102380] text-white hover:bg-[#0c1a61]",
  "navy-hover-gold": "bg-[#102380] text-white hover:bg-[#D4AF37] hover:text-[#102380]",
};

const sizeClasses = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200";

export function LinkButton({
  href,
  variant = "gold",
  size = "md",
  className = "",
  children,
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variantClasses[variant] || variantClasses.gold} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "gold",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      className={`${base} ${variantClasses[variant] || variantClasses.gold} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}