import { MapPin, PhoneCall } from "lucide-react";

// STEP 1 of a deliberately incremental rebuild (explicitly requested):
// just the navy block + gold outline shape, no photos/logo/text yet.
// Once this shape is confirmed correct, the content gets layered back in.
//
// Every coordinate below is a MOCKUP PIXEL coordinate, measured directly
// off `Home/MOCKUP/8. FOOTER.png` (2051×767) by pixel-scanning the gold
// stroke (column-wise topmost/bottommost/leftmost gold pixel, thresholded
// on hue rather than exact RGB so anti-aliased edge pixels still count).
// The viewBox is set to the mockup's own pixel space (`VIEWBOX_W` =
// 2051), so these numbers are used as-is with NO unit conversion — every
// earlier pass that hand-picked round numbers (230, 1600, 110…) and
// converted between an arbitrary design canvas and the mockup turned out
// to have silently-wrong proportions once actually checked against the
// source pixels (e.g. the top corner was ~25% too wide relative to the
// flat top). Sourcing coordinates directly from the image removes that
// whole class of conversion error.
const VIEWBOX_W = 2051;
const FLAT_TOP_Y = 62; // where the flat top edge sits (also the cream margin height above the shape)
const CORNER_BOTTOM_Y = 251; // where each top corner's curve ends and the straight side begins
const STRAIGHT_BOTTOM_Y = 674; // where each straight side ends / the bottom-corner's deepest point
const BOTTOM_MARGIN = 40; // breathing room below the shape's deepest point, canvas-only (not traced)
const VIEWBOX_H = STRAIGHT_BOTTOM_Y + BOTTOM_MARGIN;

// Where the flat top edge begins/ends (x only — y is `FLAT_TOP_Y` for both).
const CORNER_WIDTH = 220;

// Converts a point series into a smooth path: each segment is a
// quadratic curve to the MIDPOINT of the next two points (the standard
// "smooth freehand line" technique) — plain straight-line segments
// between many sampled points still read as faceted up close (visible
// in the first pass's corner scallops), even at a high sample count.
// Passes exactly through the FIRST and LAST point (via a straight `L`)
// and flows smoothly near the interior points without necessarily
// touching them exactly — which is what makes two calls back-to-back,
// sharing an endpoint, meet at a genuine sharp vertex there (used below
// for the bottom edge's center peak).
function smoothPathFromPoints(pts) {
  if (pts.length < 2) return "";
  let d = `L${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += ` Q${x0.toFixed(1)},${y0.toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0].toFixed(1)},${last[1].toFixed(1)}`;
  return d;
}

// Catmull-Rom → cubic Bézier: unlike `smoothPathFromPoints` above, this
// passes EXACTLY through every point, not just the first/last — needed
// for the bottom edge, whose corner/bump/valley points are few and far
// apart, so the midpoint-quadratic technique's natural undershoot at
// interior points was visibly pulling the curve ~15-20px short of the
// mockup's actual bump/valley depth (confirmed by overlaying the
// computed path directly on the mockup image). Still C1-smooth
// (continuous tangent) throughout, so it doesn't reintroduce any
// faceting — it just stops cutting the corners of what the traced
// points actually say.
function catmullRomPath(pts) {
  if (pts.length < 2) return "";
  let d = `L${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

// The top-left corner's outline, traced directly from the mockup image
// (pixel-sampled along the gold stroke, x every ~4px from the straight
// vertical edge to the flat top, smoothed to remove anti-aliasing
// noise) rather than generated from a formula — every formula-based
// attempt (perpendicular offset, then a true polar arc-sweep with 3
// even bumps) produced evenly-spaced repeating bumps that read as
// "spiky"/"aneh" once rendered, while the real mockup curve is one
// large flowing lobe with a shallow shoulder and a second, smaller
// lift — an irregular rhythm no simple wave formula reproduces. Stored
// as [xFraction, yFraction] pairs (0,1 = corner's outer/bottom point,
// at `leftTop`; 1,0 = corner's inner/top point, at `topLeftEnd`) so it
// maps onto the corner's actual measured span and mirrors cleanly.
const TOP_LEFT_CORNER_CURVE = [
  [0, 1], [0.0339, 0.8891], [0.0683, 0.8218], [0.1022, 0.7836],
  [0.1361, 0.7418], [0.17, 0.7036], [0.2043, 0.67], [0.2383, 0.6464],
  [0.2722, 0.6245], [0.3065, 0.5664], [0.3404, 0.5145], [0.3743, 0.4591],
  [0.4087, 0.4073], [0.4426, 0.37], [0.4765, 0.3409], [0.5104, 0.3173],
  [0.5448, 0.2982], [0.5787, 0.2827], [0.6126, 0.27], [0.647, 0.2609],
  [0.6809, 0.25], [0.7148, 0.2136], [0.7491, 0.1573], [0.783, 0.1118],
  [0.817, 0.0755], [0.8509, 0.0482], [0.8852, 0.0282], [0.9191, 0.0127],
  [0.953, 0.0045], [0.9874, 0], [1, 0],
];

function buildFooterShapePath() {
  const topLeftEnd = [CORNER_WIDTH, FLAT_TOP_Y];
  const topRightStart = [VIEWBOX_W - CORNER_WIDTH, FLAT_TOP_Y];
  const leftTop = [0, CORNER_BOTTOM_Y];
  const rightTop = [VIEWBOX_W, CORNER_BOTTOM_Y];
  const leftBottom = [0, STRAIGHT_BOTTOM_Y];
  const rightBottom = [VIEWBOX_W, STRAIGHT_BOTTOM_Y];

  // Left corner: map the traced curve's [xFraction, yFraction] onto the
  // actual measured span between `leftTop` and `topLeftEnd`. Right
  // corner: the exact mirror image, traversed in reverse so the path
  // still flows from the flat top (`topRightStart`) down to the
  // straight right edge (`rightTop`).
  const cornerX = (xf) => xf * topLeftEnd[0] + (1 - xf) * leftTop[0];
  const cornerY = (yf) => yf * leftTop[1] + (1 - yf) * topLeftEnd[1];
  const topLeftScallop = TOP_LEFT_CORNER_CURVE.map(
    ([xf, yf]) => [cornerX(xf), cornerY(yf)]
  );
  const topRightScallop = [...TOP_LEFT_CORNER_CURVE]
    .reverse()
    .map(([xf, yf]) => [VIEWBOX_W - cornerX(xf), cornerY(yf)]);

  // Bottom edge, pixel-traced the same way (bottommost gold pixel per
  // column, y search restricted to 580–700 in mockup space to stay
  // clear of the unrelated copyright-bar dot ornament lower on the
  // page). Real rhythm, corner to center: the CORNER is the deepest
  // point → rises into a wide, shallow bump → dips into a slightly
  // deeper (but still shallower-than-corner) valley → rises sharply
  // into a genuinely SHARP center peak (near-straight lines meeting at
  // a point, confirmed by direct visual zoom — not a rounded dome).
  // Mirrored on the left.
  const bumpRight = [1795, 633];
  const valleyRight = [1327, 661];
  const peak = [Math.round(VIEWBOX_W / 2), 593];
  const valleyLeft = [724, 661];
  const bumpLeft = [256, 633];

  return [
    `M${topLeftEnd[0]},${topLeftEnd[1]}`,
    `L${topRightStart[0]},${topRightStart[1]}`,
    smoothPathFromPoints(topRightScallop), // -> rightTop
    catmullRomPath([rightBottom, bumpRight, valleyRight, peak]), // rightTop -> rightBottom (straight edge) -> peak, exact through bump/valley
    catmullRomPath([peak, valleyLeft, bumpLeft, leftBottom]), // peak -> leftBottom, exact
    smoothPathFromPoints(topLeftScallop), // leftBottom -> leftTop (straight edge) -> topLeftEnd
    "Z",
  ].join(" ");
}

const FOOTER_SHAPE_D = buildFooterShapePath();

// STEP 4: the decorative pointed-arch NICHE frame around the logo
// block — separate content drawn OVER the outline (confirmed earlier:
// not part of the box shape itself, not mirrored to the box's right
// side). Corrected after being flagged as "not matching at all": this
// isn't just a small flourish above the logo — it's a full niche/mihrab
// outline whose scalloped dome (traced the same way as the box's own
// corners: topmost gold pixel per column) transitions into STRAIGHT
// VERTICAL SIDES that continue down, framing the logo + tagline +
// description block, terminating around the bottom divider's height.
// Missed entirely on the first pass (only the dome was built), which is
// what actually made it read as "trash" next to the mockup.
const ARCH_PEAK_X = 427;
// The left side runs all the way down to the SAME depth as the box's
// own straight sides (`STRAIGHT_BOTTOM_Y`), so it reads as grounded
// into the outline rather than floating with a dangling end — this is
// what "menyatu dengan outline" meant. The right side, by contrast,
// only gets a SHORT extension that fades to transparent (a separate
// gradient-stroked path below), matching "pelan-pelan fade out" rather
// than either a hard stop (previous pass) or a full mirrored line.
const ARCH_LEFT_BOTTOM_Y = STRAIGHT_BOTTOM_Y;
const ARCH_RIGHT_FADE_BOTTOM_Y = 460;
const ARCH_LEFT_HALF = [
  [190, 282.3], [196, 273], [202, 265.1], [208, 259], [214, 253.8],
  [220, 249.9], [226, 246.9], [232, 242.3], [238, 227.9], [244, 215.9],
  [250, 208.2], [256, 202.3], [262, 198], [268, 194.4], [274, 191.8],
  [280, 189.7], [286, 187.9], [292, 186.7], [298, 182], [304, 174.3],
  [310, 168.4], [316, 163.9], [322, 160.3], [328, 157.2], [334, 154.7],
  [340, 152.8], [346, 151.4], [352, 150.4], [358, 150], [364, 149.3],
  [370, 148.8], [376, 148], [382, 147], [388, 145.6], [394, 143.6],
  [400, 141.3], [406, 138.4], [412, 134.8], [418, 128.2], [424, 118.8],
  [427, 112.8],
];
const ARCH_RIGHT_FOOT_X = 2 * ARCH_PEAK_X - ARCH_LEFT_HALF[0][0];
// catmullRomPath (not smoothPathFromPoints) — the quadratic-midpoint
// technique undershoots at interior points, which is exactly what
// flattened out the arch's real double-lobed silhouette into one
// bland curve (the same bug already caught and fixed on the bottom
// edge's bump/valley earlier).
const ARCH_PATH_D = [
  `M${ARCH_LEFT_HALF[0][0]},${ARCH_LEFT_BOTTOM_Y}`,
  `L${ARCH_LEFT_HALF[0][0]},${ARCH_LEFT_HALF[0][1]}`,
  catmullRomPath(ARCH_LEFT_HALF),
  catmullRomPath(
    [...ARCH_LEFT_HALF].reverse().map(([x, y]) => [2 * ARCH_PEAK_X - x, y])
  ),
].join(" ");
const ARCH_RIGHT_FADE_PATH_D = `M${ARCH_RIGHT_FOOT_X},${ARCH_LEFT_HALF[0][1]} L${ARCH_RIGHT_FOOT_X},${ARCH_RIGHT_FADE_BOTTOM_Y}`;

// Closed silhouette (dome + both sides + a flat bottom) used ONLY as a
// navy fill sitting between the building photo and the logo/text
// content — without it, the fading photo shows through and fights with
// the white/gold text inside the arch.
const ARCH_FILL_PATH_D = [
  `M${ARCH_LEFT_HALF[0][0]},${ARCH_LEFT_BOTTOM_Y}`,
  `L${ARCH_LEFT_HALF[0][0]},${ARCH_LEFT_HALF[0][1]}`,
  catmullRomPath(ARCH_LEFT_HALF),
  catmullRomPath(
    [...ARCH_LEFT_HALF].reverse().map(([x, y]) => [2 * ARCH_PEAK_X - x, y])
  ),
  `L${ARCH_RIGHT_FOOT_X},${ARCH_LEFT_BOTTOM_Y}`,
  "Z",
].join(" ");

// STEP 2: the two edge photos (mosque→school-building on the left,
// lantern on the right in the mockup). Per direct inspection of the
// mockup, both photos: have no rectangular frame (flush against the
// box's own curved silhouette, not a card floating on top of it), fade
// to the flat navy fill toward the box's INTERIOR only (not toward
// their own outer edge), and carry a cool navy grade rather than
// sitting at full/bright color. Built as SVG <image>s so they share the
// exact same coordinate space and clip boundary as the outline path
// above — no separate CSS-vs-SVG coordinate translation to get wrong.
// Measured directly off the mockup with a ruler overlay (not guessed):
// the left photo's actual detail is gone (pure flat navy) by x≈340, and
// the right photo's niche doesn't start appearing until x≈1760 — the
// first pass used 620 for both, which visibly bled into the logo/text
// column on the left and the social icons on the right once checked by
// layering the render directly over the mockup.
const LEFT_PHOTO_W = 360;
const RIGHT_PHOTO_W = 290;

// The lantern <image> was first sized with `preserveAspectRatio="xMidYMid
// slice"` (cover-fill) into the fade box above — but "cover" picks
// whichever scale fills BOTH dimensions, which is scale-by-HEIGHT here
// (612/1536 ≈ 0.398) and has nothing to do with how large the arch
// actually is in the mockup. Measured directly (ruler overlay on both
// the mockup and the raw source photo): the mockup's arch is ~190px
// wide and its content (tip to the lantern's dangling point) spans
// mockup y≈230-600, vs. the source photo's arch spanning source
// x≈225-795 and content y≈105-1325. Solving for the scale and offset
// that reproduces those exact mockup measurements (not a guessed cover
// fit) gives scale≈0.303 — cover-fill was rendering the arch ~30%
// too large, which is what the layered-overlay check actually caught.
const LANTERN_SCALE = 0.303;
const LANTERN_SRC_W = 1024;
const LANTERN_SRC_H = 1536;
const LANTERN_X = 1761; // = measured mockup arch-center(1915) - source arch-center(510)*scale
const LANTERN_Y = 198; // = measured mockup content-top(230) - source content-top(105)*scale

// STEP 3: "Kontak Kami" + "Follow Us" columns (the rest of the content —
// logo/description and the two "Alamat" columns — comes in a later
// pass, per the same incremental sequencing as the shape/photos above).
// Positioned with exact mockup pixel coordinates (ruler-measured, same
// method as the shape/photos) inside a fixed `VIEWBOX_W`×`VIEWBOX_H`
// layer that's scaled to the container via CSS container query units
// (`cqw`) — this keeps every position/size defined in the SAME mockup
// pixel space as the SVG shape above, so it scales in lockstep with it
// with no separate percentage/rem conversion to get subtly wrong.
function px(value) {
  return `calc(${value} / ${VIEWBOX_W} * 100cqw)`;
}

function IconCircle({ children, size = 55, iconSize = 24 }) {
  return (
    <span
      className="flex items-center justify-center rounded-full border border-[#FDD000] text-[#FDD000] shrink-0"
      style={{ width: px(size), height: px(size) }}
    >
      <span style={{ width: px(iconSize), height: px(iconSize) }}>{children}</span>
    </span>
  );
}

// All 4 "Follow Us" glyphs are SOLID FILLED shapes in the mockup except
// Instagram (confirmed by direct pixel zoom — Facebook's "f", YouTube's
// play-rect, and TikTok's note are all flat filled gold, only Instagram
// is stroke/outline). The first pass got this backwards (stroke
// Facebook/YouTube/TikTok, filled-badge Instagram) which is what made
// Facebook in particular look "weird" — its path was authored as a
// thin outline, not a solid glyph.
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.11h2.72l.41-3.15h-3.13V7.71c0-.91.25-1.53 1.56-1.53h1.67V3.36C15.94 3.25 15.03 3.19 14.12 3.19c-2.5 0-4.21 1.53-4.21 4.33v2.22H7.19v3.15h2.72V21h3.59z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Filled rounded-rect with the play triangle CUT OUT (drawn in the
// navy fill color, not transparent — matches the mockup's solid gold
// badge with a punched-through triangle, not an outlined rect).
function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" />
      <path d="M10.5 9.3v5.4l4.8-2.7z" fill="#0b1a63" />
    </svg>
  );
}

function TiktokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 2h-3v13.7a2.6 2.6 0 1 1-2.1-2.55v-3.08a5.62 5.62 0 1 0 4.9 5.58c0-.06 0-.13 0-.19V8.35A6.47 6.47 0 0 0 20 9.9V6.8a4.4 4.4 0 0 1-3.5-3.5V2z" />
    </svg>
  );
}

// Solid filled envelope — confirmed by direct pixel zoom (the mockup's
// email icon is a flat filled shape, not lucide's outline `Mail`).
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  );
}

// The mockup's WhatsApp glyph is a chat-BUBBLE (circle with a small
// pointed tail), not a plain circle — flagged directly: "outline
// should not be rounded circle". Built as one shape (bubble outline +
// filled handset) rather than a lucide icon dropped into a circular
// badge.
function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.3A8.4 8.4 0 1 0 12 3.5z"
      />
      <path
        fill="currentColor"
        stroke="none"
        d="M9.1 7.9c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.07-.8.37-.27.27-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.3 5.2 4.5.72.3 1.28.5 1.72.6.72.24 1.38.2 1.9.13.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.34-.3-.16-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.16-.2.3-.78.98-.96 1.18-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.14-.17.19-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.68-1.65-.95-2.24z"
      />
    </svg>
  );
}

// Same sun/sparkle ornament used in every divider elsewhere on this
// page (JourneySection, TestimonialSection, BlogPreview, …).
function DividerSun({ style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: px(20), height: px(20), ...style }}
      className="text-[#FDD000] shrink-0"
    >
      <path d="M12 2l1.6 5.1L18 4l-2.6 4.7L21 10l-5 1.6L21 14l-5.6 1.3L18 20l-4.4-3.1L12 22l-1.6-5.1L6 20l2.6-4.7L3 14l5-1.6L3 10l5.6-1.3L6 4l4.4 3.1z" />
    </svg>
  );
}

// Re-checked directly against the mockup pixel-by-pixel: the envelope
// is solid FILLED (not lucide's outline `Mail`), Instagram is plain
// outline with no badge/wrapper at all (the filled rounded-square
// badge from the previous pass was wrong), and the WhatsApp rows use
// the icon's own chat-bubble outline as their only "frame" — no extra
// circular badge around it.
const KONTAK_ROWS = [
  { Icon: MailIcon, text: "Email : attaufiqjambi@attaufiqjambi.com", href: "mailto:attaufiqjambi@attaufiqjambi.com", size: 24 },
  { Icon: InstagramIcon, text: "@instagram", href: "#", size: 24 },
  { Icon: WhatsappIcon, text: "+62 852-6879-7915 (WA PG-TK-SD)", href: "https://wa.me/6285268797915", size: 30 },
  { Icon: WhatsappIcon, text: "+62 819-2742-1650 (WA SMP-SMA)", href: "https://wa.me/6281927421650", size: 30 },
];

const ALAMAT_BLOCKS = [
  {
    heading: "Alamat PG-TK & SD",
    lines: ["Jl. Letkol M. Insya No.2, Rajawali,", "Kec. Jambi Tim., Kota Jambi,", "Jambi 36143"],
  },
  {
    heading: "Alamat SMP-SMA",
    lines: ["Jl. Gn. Kidul No.11, Talang Banjar,", "Kec. Jambi Tim., Kota Jambi,", "Jambi 36142"],
  },
];

const SOCIAL_ICONS = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: TiktokIcon, label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ivory">
      {/* A fixed pixel `height` here would force `preserveAspectRatio="none"`
          below to stretch the shape NON-uniformly whenever the container's
          own width/height ratio doesn't match the design canvas's.
          `aspectRatio` locks the container to the EXACT same ratio as the
          viewBox (which is now the mockup's own pixel dimensions), so the
          stretch is always uniform regardless of viewport width. */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}`, containerType: "inline-size" }}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <clipPath id="footerShapeClip">
              <path d={FOOTER_SHAPE_D} />
            </clipPath>
            {/* userSpaceOnUse (not the default objectBoundingBox) so the
                fade's start/end sit at exact viewBox pixel positions —
                independent of whatever box the masked element happens
                to occupy. */}
            <linearGradient id="leftPhotoFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={LEFT_PHOTO_W} y2="0">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="45%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <linearGradient
              id="rightPhotoFade"
              gradientUnits="userSpaceOnUse"
              x1={VIEWBOX_W - RIGHT_PHOTO_W}
              y1="0"
              x2={VIEWBOX_W}
              y2="0"
            >
              <stop offset="0%" stopColor="#000" />
              <stop offset="55%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <mask id="leftPhotoMask">
              <rect x="0" y="0" width={LEFT_PHOTO_W} height={VIEWBOX_H} fill="url(#leftPhotoFade)" />
            </mask>
            <mask id="rightPhotoMask">
              <rect x={VIEWBOX_W - RIGHT_PHOTO_W} y="0" width={RIGHT_PHOTO_W} height={VIEWBOX_H} fill="url(#rightPhotoFade)" />
            </mask>
          </defs>

          <path d={FOOTER_SHAPE_D} fill="#0b1a63" />

          <g clipPath="url(#footerShapeClip)">
            <image
              href="/images/footer/footer-building-v3.png"
              x="0"
              y={FLAT_TOP_Y}
              width={LEFT_PHOTO_W}
              height={STRAIGHT_BOTTOM_Y - FLAT_TOP_Y}
              preserveAspectRatio="xMidYMid slice"
              mask="url(#leftPhotoMask)"
              opacity="0.8"
            />
            <image
              href="/images/footer/footer-lantern.png"
              x={LANTERN_X}
              y={LANTERN_Y}
              width={LANTERN_SRC_W * LANTERN_SCALE}
              height={LANTERN_SRC_H * LANTERN_SCALE}
              mask="url(#rightPhotoMask)"
              opacity="0.8"
            />
            {/* A translucent navy wash over both photos — the "cool navy
                grade" from the mockup — rather than the raw photo color. */}
            <rect x="0" y="0" width={LEFT_PHOTO_W} height={VIEWBOX_H} fill="#0b1a63" opacity="0.35" mask="url(#leftPhotoMask)" />
            <rect
              x={VIEWBOX_W - RIGHT_PHOTO_W}
              y="0"
              width={RIGHT_PHOTO_W}
              height={VIEWBOX_H}
              fill="#0b1a63"
              opacity="0.35"
              mask="url(#rightPhotoMask)"
            />
          </g>

          {/* Redrawn on top, stroke-only, so the gold outline stays visible over the photos. */}
          <path d={FOOTER_SHAPE_D} fill="none" stroke="#FDD000" strokeWidth="3" />

          {/* Everything about the arch clipped to the SAME box-outline path
              as the photos above — flagged directly: the arch's left side
              (now reaching down to STRAIGHT_BOTTOM_Y) was rendering past
              the box's own curved edge instead of stopping at it. */}
          <g clipPath="url(#footerShapeClip)">
            {/* Solid navy fill for the arch's interior — sits above the
                (still-visible-elsewhere) building photo so the photo can't
                show through and fight with the logo/tagline/description text
                that lives inside the arch. Drawn before the gold outline. */}
            <path d={ARCH_FILL_PATH_D} fill="#0b1a63" />

            {/* Decorative arch above the logo — see STEP 4 above. */}
            <path d={ARCH_PATH_D} fill="none" stroke="#FDD000" strokeWidth="3" />
            <defs>
              <linearGradient id="archRightFade" gradientUnits="userSpaceOnUse" x1="0" y1={ARCH_LEFT_HALF[0][1]} x2="0" y2={ARCH_RIGHT_FADE_BOTTOM_Y}>
                <stop offset="0%" stopColor="#FDD000" stopOpacity="1" />
                <stop offset="100%" stopColor="#FDD000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={ARCH_RIGHT_FADE_PATH_D} fill="none" stroke="url(#archRightFade)" strokeWidth="3" />
          </g>
        </svg>

        {/* Content layer, positioned with the same measured mockup pixel
            coordinates as the shape/photos above via `px()`, so it scales
            in lockstep with them. */}

        {/* Sun ornament at the arch's own peak — separate from the logo. */}
        <DividerSun
          style={{ position: "absolute", left: px(407), top: px(75), width: px(40), height: px(40) }}
        />

        {/* Logo lockup — the FULL, uncropped source asset (icon, its own
            built-in white sun-flare, and "SEKOLAH ISLAM" / "Attaufiq" /
            "PG-TK-SD-SMP-SMA"), used whole per direct instruction: no
            cropping at all. Earlier passes cropped out the asset's own
            sun and added a separate gold one next to it — which is what
            produced a stray yellow sun the asset was never supposed to
            have. Sized/positioned so the asset's own sun lands where that
            stray gold one used to be (clear of the dome curve above it),
            and the icon+text portion lands at the same, already-verified
            non-colliding spot used before. */}
        <img
          src="/images/footer/footer-logo.png"
          alt="Sekolah Islam Attaufiq"
          className="absolute"
          style={{ left: px(234), top: px(164), width: px(409) }}
        />

        <p className="absolute font-bold text-[#FDD000] md:text-[#FDD000]" style={{ left: px(185), top: px(360), width: px(450), fontSize: px(26) }}>
          Memberi Arti itu ATTAUFIQ
        </p>

        {/* Directly flagged: this paragraph's left edge and line-length
            should match the tagline above, not sit indented/narrower —
            overriding the earlier "independently measured" indent, which
            was wrong. Width capped at 450 (same as the tagline) so neither
            spills out past the arch's inner edge. */}
        <p
          className="absolute text-white/90 leading-relaxed"
          style={{ left: px(185), top: px(412), width: px(450), fontSize: px(16) }}
        >
          Membina generasi beradab dengan pendidikan Islam yang menyeluruh, menggabungkan ilmu, karakter, dan
          spiritualitas untuk masa depan yang penuh keberkahan.
        </p>

        <div className="absolute flex items-center" style={{ left: px(200), top: px(550), width: px(460), gap: px(9) }}>
          <span className="bg-[#FDD000]" style={{ width: px(180), height: px(2.5) }} />
          <DividerSun />
          <span className="flex-1 border-t border-dashed border-[#FDD000]/50" />
        </div>

        {/* Vertical dotted divider between the logo/description column and "Alamat". */}
        <div
          className="absolute border-l border-dashed border-[#FDD000]/40"
          style={{ left: px(660), top: px(188), height: px(365) }}
        />

        <div className="absolute text-white" style={{ left: px(700), top: px(205), width: px(340) }}>
          {ALAMAT_BLOCKS.map((block, i) => (
            <div key={block.heading} style={{ marginTop: i === 0 ? 0 : px(30) }}>
              <div className="flex items-center" style={{ gap: px(10) }}>
                <MapPin style={{ width: px(20), height: px(20) }} className="text-[#FDD000] shrink-0" />
                <span className="font-bold" style={{ fontSize: px(20) }}>{block.heading}</span>
              </div>
              <div className="flex items-center" style={{ marginTop: px(10), gap: px(9) }}>
                <span className="flex-1 border-t border-[#FDD000]/50" />
              </div>
              <div style={{ marginTop: px(10) }}>
                {block.lines.map((line) => (
                  <p key={line} className="text-white/90" style={{ fontSize: px(15), lineHeight: 1.6 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vertical dotted divider between "Alamat" and "Kontak Kami". */}
        <div
          className="absolute border-l border-dashed border-[#FDD000]/40"
          style={{ left: px(1060), top: px(188), height: px(365) }}
        />

        <div
          className="absolute text-white"
          style={{ left: px(1105), top: px(205), width: px(430) }}
        >
          <div className="flex items-center" style={{ gap: px(12) }}>
            <IconCircle size={35} iconSize={20}>
              <PhoneCall className="h-full w-full text-[#FDD000]" />
            </IconCircle>
            <span className="font-bold" style={{ fontSize: px(24) }}>Kontak Kami</span>
          </div>
          <div className="flex items-center" style={{ marginTop: px(14), gap: px(9) }}>
            <span className="bg-[#FDD000]" style={{ width: px(90), height: px(2.5) }} />
            <DividerSun />
            <span className="flex-1 border-t border-dashed border-[#FDD000]/50" />
          </div>
          <div style={{ marginTop: px(20) }}>
            {KONTAK_ROWS.map((row, i) => (
              <a
                key={i}
                href={row.href}
                className="flex items-center border-b border-dotted border-[#FDD000]/40 hover:text-#FDD000 transition-colors"
                style={{ gap: px(16), paddingBottom: px(9), marginTop: i === 0 ? 0 : px(18) }}
              >
                <row.Icon style={{ width: px(row.size), height: px(row.size) }} className="shrink-0 text-[#FDD000]" />
                <span style={{ fontSize: px(15) }}>{row.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Vertical dotted divider between the two columns. */}
        <div
          className="absolute border-l border-dashed border-[#FDD000]/40"
          style={{ left: px(1545), top: px(188), height: px(365) }}
        />

        <div
          className="absolute text-white"
          style={{ left: px(1600), top: px(205), width: px(340) }}
        >
          <span className="font-bold" style={{ fontSize: px(24) }}>Follow Us</span>
          <div className="flex items-center" style={{ marginTop: px(14), gap: px(9) }}>
            <span className="bg-[#FDD000]" style={{ width: px(45), height: px(2.5) }} />
            <DividerSun />
            {/* Mockup's Follow Us divider also continues past the sun, same
                as Kontak Kami's — just a plain (non-dashed) thin line rather
                than dotted. Missed entirely in the first pass. */}
            <span className="flex-1 border-t border-[#FDD000]/30" />
          </div>
          <div className="flex" style={{ marginTop: px(20), gap: px(10) }}>
            {SOCIAL_ICONS.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="hover:opacity-75 transition-opacity">
                <IconCircle>
                  <Icon className="h-full w-full" />
                </IconCircle>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
