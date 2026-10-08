// Gold arch + zellige lattice ornament, pinned flush to the hero's top and
// bottom edges. The wrapper is masked with a soft gradient on its inner
// edge so the pattern dissolves into the navy background instead of
// cutting off with a hard rectangular edge. Mirrors to the right when the
// text block sits on the right side of a slide — the mask (defined in the
// element's own left-to-right local space) flips along with it, so it
// always fades on the edge facing the hero's text/photo, not the outer
// screen edge.
export default function HeroOrnament({ side }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 z-10 w-20 overflow-hidden opacity-95 sm:w-28 md:w-40 lg:w-52 ${
        side === "left" ? "left-0" : "right-0 -scale-x-100"
      }`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
      }}
    >
      <img
        src="/images/hero/hero-ornament-arch-v2.png"
        alt=""
        className="h-full w-auto max-w-none object-cover object-left-top"
      />
    </div>
  );
}
