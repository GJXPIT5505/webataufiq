// Reusable hand-drawn-style underline: a gentle curved stroke instead of a
// rigid straight bar. Width stretches to fill its parent (place inside a
// `relative inline-block` wrapper sized to the text it underlines).
export default function SwooshUnderline({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M2 6.5 C 40 2, 70 9.5, 100 6 C 130 2.5, 160 9, 198 4.5"
        fill="none"
        stroke="#FDD000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
