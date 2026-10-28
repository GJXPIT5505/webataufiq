import React from "react";
import { Link } from "@inertiajs/react";
import { FilePenLine, MapPin, MessageCircleMore } from "lucide-react";
import { WhatsappIcon } from "./WhatsappIcon";

// Floating quick menu (desktop with a mouse only).
// At rest only the navy 8-point star ("MENU") shows; hovering it
// unfolds four petals around it:
// WA PG-TK-SD (top), Daftar (right), Lokasi (bottom), WA SMP-SMA (left).

const STAR_PX = 112; // star box; tip radius ≈ 55px
const PETAL_W = 104; // long side
const PETAL_D = 76; // depth, inner edge → outer point
const INNER = 50; // centre → petal inner edge (the star tip passes this)
const C = INNER + PETAL_D + 4; // centre (cluster is 2C square)
const GAP_PX = 4; // clear gap between star and notch

export const STAR_POINTS = Array.from({ length: 16 }, (_, k) => {
  const angle = (k * Math.PI) / 8 - Math.PI / 2;
  const r = k % 2 === 0 ? 46 : 46 * 0.765;
  return `${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`;
}).join(" ");
const STAR_STROKE = 6;

const PETAL_PATH =
  "M10,74 Q0,74 0,64 L0,38 Q0,26 12,18 L44,2 Q50,-1 56,2 L88,18 Q100,26 100,38 L100,64 Q100,74 90,74 Z";

export const PETALS = [
  { label: "WA", sub: "PG-TK-SD", href: "https://wa.me/6285268797915", external: true, Icon: WhatsappIcon, fill: "#5BBDF0", side: "top" },
  { label: "Daftar", href: "/admission", Icon: FilePenLine, fill: "#FBF6EA", side: "right" },
  { label: "Lokasi", href: "/about#lokasi", Icon: MapPin, fill: "#FDD000", side: "bottom" },
  { label: "WA", sub: "SMP-SMA", href: "https://wa.me/6282311772225", external: true, Icon: WhatsappIcon, fill: "#FBF6EA", side: "left" },
];

const OUTER = INNER + PETAL_D;
const SIDE = {
  top: { x: C - PETAL_W / 2, y: C - OUTER, w: PETAL_W, h: PETAL_D, rotate: 0, from: "translate-y-8", pad: "pt-2" },
  right: { x: C + INNER, y: C - PETAL_W / 2, w: PETAL_D, h: PETAL_W, rotate: 90, from: "-translate-x-8", pad: "pr-2" },
  bottom: { x: C - PETAL_W / 2, y: C + INNER, w: PETAL_W, h: PETAL_D, rotate: 180, from: "-translate-y-8", pad: "pb-2" },
  left: { x: C - OUTER, y: C - PETAL_W / 2, w: PETAL_D, h: PETAL_W, rotate: 270, from: "translate-x-8", pad: "pl-2" },
};

const PETAL_TRANSFORM = `translate(${C - PETAL_W / 2} ${C - OUTER}) scale(${PETAL_W / 100} ${PETAL_D / 74})`;
const STAR_IN_CLUSTER = `translate(${C - STAR_PX / 2} ${C - STAR_PX / 2}) scale(${STAR_PX / 100})`;
const NOTCH_STROKE = STAR_STROKE + (2 * GAP_PX * 100) / STAR_PX;

const DELAY = ["group-hover:delay-0", "group-hover:delay-[50ms]", "group-hover:delay-100", "group-hover:delay-150"];

export default function QuickMenu() {
  return (
    <div
      className="quick-menu pointer-events-none fixed bottom-3 right-3 z-[90]"
      style={{ width: 2 * C, height: 2 * C }}
    >
      <nav aria-label="Menu cepat" className="group relative h-full w-full">
        {PETALS.map(({ label, sub, href, external, Icon, fill, side }, i) => {
          const s = SIDE[side];
          const LinkComponent = external || href.startsWith("http") ? "a" : Link;

          return (
            <div key={side} className="absolute" style={{ left: s.x, top: s.y, width: s.w, height: s.h }}>
              <LinkComponent
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={sub ? `WhatsApp ${sub}` : undefined}
                className={`pointer-events-none absolute inset-0 scale-75 opacity-0 ${s.from} transition-all duration-300 ease-out group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 ${DELAY[i]} hover:brightness-95`}
              >
                <svg
                  viewBox={`0 0 ${2 * C} ${2 * C}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute overflow-visible drop-shadow-[0_6px_10px_rgba(16,35,128,0.2)]"
                  style={{ left: -s.x, top: -s.y, width: 2 * C, height: 2 * C }}
                >
                  <defs>
                    <mask id={`quick-menu-notch-${side}`} maskUnits="userSpaceOnUse" x="-20" y="-20" width={2 * C + 40} height={2 * C + 40}>
                      <rect x="-20" y="-20" width={2 * C + 40} height={2 * C + 40} fill="white" />
                      <polygon
                        points={STAR_POINTS}
                        transform={STAR_IN_CLUSTER}
                        fill="black"
                        stroke="black"
                        strokeWidth={NOTCH_STROKE}
                        strokeLinejoin="round"
                      />
                    </mask>
                  </defs>
                  <g mask={`url(#quick-menu-notch-${side})`}>
                    <g transform={`rotate(${s.rotate} ${C} ${C})`}>
                      <path d={PETAL_PATH} transform={PETAL_TRANSFORM} fill={fill} />
                    </g>
                  </g>
                </svg>
                <span className={`relative flex h-full flex-col items-center justify-center gap-0.5 text-navy ${s.pad}`}>
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
                  <span className="text-[11px] font-extrabold uppercase leading-none tracking-wide">{label}</span>
                  {sub && <span className="text-[8.5px] font-bold leading-none">{sub}</span>}
                </span>
              </LinkComponent>
            </div>
          );
        })}

        {/* The star — always visible, sits above the petals */}
        <button
          type="button"
          aria-label="Menu cepat: WhatsApp PG-TK-SD, Daftar, Lokasi, WhatsApp SMP-SMA"
          className="pointer-events-auto absolute left-1/2 top-1/2 z-10 grid -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center"
          style={{ width: STAR_PX, height: STAR_PX }}
        >
          <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_8px_16px_rgba(16,35,128,0.35)]">
            <polygon points={STAR_POINTS} fill="#102380" stroke="#102380" strokeWidth={STAR_STROKE} strokeLinejoin="round" />
          </svg>
          <span className="relative flex flex-col items-center text-white">
            <MessageCircleMore aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
            <span className="mt-0.5 text-[11px] font-bold tracking-wider">MENU</span>
          </span>
        </button>
      </nav>
    </div>
  );
}

