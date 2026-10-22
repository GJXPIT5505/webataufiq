
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import { LinkButton } from "@/Components/ui/Button";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

// Step icons — vector-traced from the user's second, high-resolution
// reference image (transparent PNG, clean strokes — a much better source
// than the first low-contrast glow render). Contour-extracted straight
// from the alpha channel via cv2.findContours, same pipeline as the
// facility tab icons.
function RegistrationIcon() {
  return (
    <svg viewBox="0 0 553 583" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M76,477 L76,485 L82,491 L221,491 L228,483 L226,475 L219,471 L84,471 L79,473 Z M76,426 L76,434 L82,440 L284,440 L288,438 L291,433 L290,425 L283,420 L84,420 Z M76,375 L76,382 L83,388 L333,388 L340,383 L341,379 L338,371 L333,368 L84,368 L81,369 Z M539,280 L521,268 L503,265 L485,270 L469,285 L410,356 L320,459 L295,537 L295,545 L297,548 L303,551 L309,550 L377,523 L387,517 L547,328 L551,319 L552,303 L549,293 Z M360,507 L323,523 L321,522 L334,484 Z M467,322 L493,344 L500,352 L378,495 L376,495 L349,471 L344,464 L426,370 L460,328 Z M501,285 L509,285 L514,287 L523,294 L531,304 L531,312 L529,317 L514,335 L479,306 L496,287 Z M130,182 L120,191 L113,202 L109,220 L110,230 L115,244 L123,255 L143,268 L131,271 L112,280 L93,298 L83,318 L80,332 L81,340 L87,345 L96,344 L101,338 L103,324 L109,312 L127,295 L145,288 L165,287 L180,291 L194,299 L209,317 L215,340 L221,345 L230,344 L235,337 L234,326 L231,315 L218,293 L198,277 L172,268 L191,257 L198,249 L204,238 L207,226 L207,217 L199,194 L185,181 L166,174 L146,175 Z M152,194 L165,194 L174,198 L182,206 L186,215 L186,227 L182,236 L176,243 L163,249 L154,249 L143,245 L135,237 L131,228 L130,219 L134,207 L141,199 Z M25,95 L15,107 L11,119 L11,550 L14,560 L19,568 L29,577 L41,582 L404,582 L419,575 L429,564 L434,551 L434,495 L428,489 L420,490 L414,497 L414,546 L411,554 L405,560 L400,562 L45,562 L34,553 L32,548 L32,120 L35,114 L44,107 L101,106 L103,120 L108,131 L114,137 L126,143 L313,144 L327,140 L338,130 L342,122 L345,106 L399,107 L410,116 L412,121 L412,310 L415,315 L419,317 L426,317 L431,313 L433,307 L433,124 L430,110 L423,99 L413,91 L402,87 L344,86 L338,72 L332,66 L323,61 L314,59 L289,59 L287,56 L285,42 L279,29 L263,12 L246,3 L229,0 L208,2 L197,6 L186,13 L170,31 L165,42 L161,59 L130,59 L122,61 L108,71 L102,86 L48,86 L35,89 Z M123,86 L131,79 L175,79 L179,77 L183,71 L183,54 L189,39 L206,24 L219,20 L231,20 L246,25 L260,38 L266,50 L267,71 L272,78 L314,79 L322,85 L323,114 L322,117 L313,124 L132,124 L123,116 Z" />
    </svg>
  );
}

function InterviewIcon() {
  return (
    <svg viewBox="0 0 790 549" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M187,385 L188,394 L191,400 L198,406 L205,408 L221,408 L232,411 L245,423 L252,445 L275,539 L278,546 L281,548 L291,547 L294,543 L294,535 L264,419 L256,406 L245,397 L229,391 L208,390 L208,386 L374,386 L375,541 L377,545 L382,548 L388,548 L395,542 L395,388 L397,386 L566,386 L568,388 L566,390 L544,391 L533,394 L519,403 L509,416 L473,536 L473,543 L478,548 L486,548 L492,541 L521,440 L528,422 L536,414 L544,410 L553,408 L571,408 L578,405 L584,399 L587,392 L587,383 L582,373 L570,367 L204,367 L196,370 L191,375 Z M716,305 L703,305 L696,308 L691,313 L687,321 L686,407 L683,419 L676,432 L667,441 L651,449 L639,451 L586,451 L580,455 L577,462 L579,471 L586,476 L640,476 L665,481 L670,490 L687,544 L692,548 L702,547 L705,542 L705,537 L687,481 L701,473 L717,457 L727,438 L733,413 L733,322 L728,312 L722,307 Z M710,322 L715,326 L715,408 L712,425 L704,443 L691,458 L678,465 L669,465 L665,463 L681,453 L691,443 L703,418 L705,402 L705,326 Z M62,305 L53,309 L49,313 L45,323 L45,415 L50,438 L59,456 L69,468 L88,480 L68,538 L69,544 L72,547 L81,548 L87,542 L109,481 L140,476 L186,476 L192,472 L194,468 L193,457 L185,451 L126,450 L110,442 L100,432 L95,423 L91,406 L91,322 L86,312 L81,308 L74,305 Z M68,322 L73,326 L73,406 L76,424 L85,442 L98,455 L112,463 L109,465 L99,465 L83,456 L74,445 L66,428 L63,412 L63,326 Z M645,267 L628,263 L614,263 L601,265 L583,273 L571,285 L567,292 L558,331 L479,331 L473,334 L471,338 L473,347 L478,350 L567,349 L575,343 L578,337 L583,306 L589,294 L597,287 L612,282 L628,282 L639,285 L651,295 L655,304 L655,391 L654,404 L650,413 L644,419 L631,424 L574,424 L566,426 L553,433 L547,439 L539,457 L516,540 L517,544 L522,548 L530,548 L535,543 L559,456 L568,445 L579,441 L641,440 L658,432 L671,415 L674,405 L675,304 L672,292 L667,283 L658,274 Z M131,267 L117,275 L112,280 L102,299 L101,398 L104,413 L110,424 L119,433 L131,439 L142,441 L196,441 L204,445 L212,456 L233,543 L238,548 L246,548 L250,544 L251,539 L230,455 L222,438 L213,430 L201,425 L145,424 L132,419 L126,413 L121,399 L122,302 L126,294 L132,288 L143,283 L165,282 L178,286 L190,297 L194,309 L199,339 L201,343 L210,350 L299,350 L304,346 L305,338 L303,334 L298,331 L218,331 L210,294 L206,286 L196,275 L182,267 L164,263 L149,263 Z M605,131 L583,136 L566,146 L558,154 L550,165 L545,178 L543,201 L545,212 L550,224 L556,233 L567,244 L588,255 L612,258 L622,257 L638,252 L659,236 L666,226 L673,209 L674,187 L668,166 L653,147 L635,136 L621,132 Z M601,151 L617,151 L637,160 L647,171 L654,191 L653,204 L646,219 L632,232 L615,238 L602,238 L583,230 L571,218 L564,200 L565,184 L573,168 L584,158 Z M163,131 L152,133 L135,140 L117,155 L112,162 L105,179 L103,198 L106,214 L112,227 L126,243 L148,255 L173,258 L189,255 L204,248 L221,233 L232,211 L234,191 L229,169 L215,149 L201,139 L189,134 Z M162,151 L184,153 L196,160 L208,173 L213,188 L213,202 L205,220 L191,232 L183,236 L173,238 L155,236 L139,227 L129,215 L124,198 L125,184 L133,168 L144,158 Z M448,86 L441,89 L436,95 L434,102 L435,108 L442,117 L446,119 L457,119 L463,116 L467,111 L469,100 L466,93 L461,88 L456,86 Z M388,86 L379,92 L376,99 L376,107 L379,113 L385,118 L398,119 L408,111 L410,100 L408,94 L402,88 L397,86 Z M331,86 L323,90 L320,94 L318,106 L321,113 L327,118 L339,119 L346,116 L351,110 L352,99 L348,91 L339,86 Z M256,63 L249,88 L249,114 L256,140 L267,159 L277,170 L269,211 L270,220 L276,225 L283,225 L339,199 L440,199 L457,197 L475,192 L495,182 L513,167 L526,150 L537,123 L539,111 L538,83 L534,68 L525,49 L515,36 L496,19 L478,9 L460,3 L449,1 L341,1 L326,4 L305,12 L285,25 L270,40 Z M271,83 L278,65 L287,52 L305,36 L322,27 L350,21 L450,22 L465,26 L481,34 L503,54 L509,63 L516,80 L518,89 L518,112 L512,132 L502,148 L489,161 L468,173 L449,178 L337,178 L294,198 L293,195 L299,165 L284,147 L274,129 L270,114 L269,102 Z" />
    </svg>
  );
}

function AdmissionIcon() {
  return (
    <svg viewBox="0 0 411 530" fill="currentColor" fillRule="evenodd" className="h-full w-full" aria-hidden="true">
      <path d="M67,434 L69,444 L75,448 L253,448 L258,446 L262,441 L262,434 L255,427 L75,427 L72,428 Z M67,380 L68,388 L74,393 L329,393 L336,385 L334,376 L326,372 L76,372 L71,374 Z M262,177 L255,171 L245,173 L175,244 L146,215 L137,215 L132,220 L132,230 L169,268 L179,269 L262,186 Z M194,100 L172,103 L148,111 L124,125 L104,144 L90,164 L83,180 L78,199 L76,225 L78,244 L87,272 L104,299 L120,315 L139,328 L162,338 L188,343 L209,343 L231,339 L259,327 L275,316 L293,298 L311,267 L318,242 L320,220 L317,195 L309,170 L294,146 L275,127 L262,118 L239,107 L214,101 Z M190,120 L206,120 L228,124 L247,132 L264,144 L277,157 L291,180 L297,199 L299,215 L298,236 L293,256 L286,271 L272,290 L255,305 L237,315 L219,321 L205,323 L183,322 L164,317 L144,307 L130,296 L118,283 L107,265 L100,246 L97,227 L97,213 L102,189 L111,170 L120,157 L145,135 L164,126 Z M16,6 L6,16 L1,29 L1,498 L3,507 L8,516 L15,523 L27,529 L384,529 L395,524 L405,514 L410,501 L410,111 L408,106 L305,3 L301,1 L54,0 L28,1 Z M306,33 L307,32 L380,106 L313,106 L306,97 Z M29,23 L34,21 L283,21 L285,23 L285,101 L290,113 L300,123 L313,128 L388,129 L389,493 L388,500 L382,507 L378,509 L34,509 L25,503 L23,499 L22,465 L22,42 L23,30 Z" />
    </svg>
  );
}

const STEPS = [
  {
    number: 1,
    title: "Pendaftaran",
    description: "Isi formulir pendaftaran secara online atau datang langsung ke sekolah.",
    Icon: RegistrationIcon,
  },
  {
    number: 2,
    title: "Observasi & Interview",
    description: "Ananda akan mengikuti observasi bermain dan wawancara orang tua.",
    Icon: InterviewIcon,
  },
  {
    number: 3,
    title: "Konfirmasi & Awal Belajar",
    description: "Setelah konfirmasi, Ananda siap memulai pengalaman belajar menyenangkan di Attaufiq!",
    Icon: AdmissionIcon,
  },
] ;

// Section 5 — "Cara Bergabung di TK Attaufiq". Title centered. Below it,
// the navy CTA card is sized FIRST — wide enough for the logo mark to
// sit beside the text+button rather than cramped underneath — and the
// leftover space is what gets split into 3 equal step columns. Each
// step is a horizontal row: icon on the left, number/title/description
// stacked to its right. Title is a prop (defaulting to PG's own copy)
// so other jenjang detail pages can reuse this exact component with
// just their own heading swapped in.
export default function JoinSection({
  title = "Cara Bergabung di TK Attaufiq",
}) {
  return (
    <section className="bg-ivory px-6 py-14">
      <div className="mx-auto" style={{ maxWidth: "calc(72rem + 6cm)" }}>
        <Reveal>
        <SectionBox>
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center gap-3">
              <ScallopBadge n={5} />
              <h2 className="font-heading text-2xl text-navy sm:text-3xl">{title}</h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_1fr_1fr_400px]">
              {STEPS.map((step, i) => (
                <Reveal
                  key={step.number}
                  delay={i * 0.1}
                  className="flex items-start gap-4 rounded-2xl border border-navy/10 p-5"
                >
                  <div className="h-14 w-14 shrink-0 text-navy">
                    <step.Icon />
                  </div>
                  <div>
                    <span className="font-heading text-lg font-bold text-gold">{step.number}</span>
                    <h3 className="font-heading text-base font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/70">{step.description}</p>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={STEPS.length * 0.1} className="flex items-center gap-4 rounded-2xl bg-navy p-5 text-white">
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">
                    Info lengkap &amp; pendaftaran kunjungi halaman Admission
                  </p>
                  <LinkButton
                    href="/admission"
                    variant="gold"
                    size="sm"
                    className="mt-4 w-fit whitespace-nowrap px-4 text-xs"
                  >
                    Lihat Halaman Admission
                    <span aria-hidden="true">&gt;</span>
                  </LinkButton>
                </div>

                <div className="relative h-28 w-28 shrink-0">
                  <img src="/images/brand/logo-mark-color.png" alt="Logo SIT Attaufiq" className="h-full w-full object-contain" />
                </div>
              </Reveal>
            </div>
          </div>
        </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}
