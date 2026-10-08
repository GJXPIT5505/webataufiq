// Reusable stand-in for real photography. Swap the parent usage for a
// regular <img> tag pointing at the real asset once photos are supplied —
// the `label` documents exactly what should go there.
export default function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      className={`relative flex items-start justify-center overflow-hidden bg-gradient-to-br from-[#102380] via-[#87CEEB]/60 to-[#D4AF37]/40 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
      <span className="relative max-w-[80%] pt-4 text-center text-xs font-medium leading-relaxed text-white/90">
        {label}
      </span>
    </div>
  );
}