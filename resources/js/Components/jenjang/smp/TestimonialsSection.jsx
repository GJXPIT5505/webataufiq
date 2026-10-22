import { Quote, User } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import Reveal from "@/Components/home/Reveal";

// Real photos not supplied yet — per instruction, each parent's photo is
// a plain generic avatar (icon in a tinted circle), not a placeholder
// photo block.
function Avatar() {
  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy/10">
      <User className="h-6 w-6 text-navy/50" aria-hidden="true" />
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Anak kami jadi lebih mandiri dan bertanggung jawab. Sekolah ini benar-benar membentuk karakternya.",
    name: "Bunda Maya",
    relation: "Orang Tua dari Zidan (Kelas 8 SMP)",
  },
  {
    quote:
      "Guru-gurunya memahami masa remaja anak kami dan membimbing dengan pendekatan yang tepat.",
    name: "Bunda Rani",
    relation: "Orang Tua dari Alya (Kelas 7 SMP)",
  },
  {
    quote:
      "Programnya membantu anak kami menemukan potensi diri sambil tetap kuat dalam nilai-nilai Islam.",
    name: "Bunda Lina",
    relation: "Orang Tua dari Fauzan (Kelas 9 SMP)",
  },
];

// Section 6 — "Apa Kata Orang Tua?" No elevated SectionBox here — this
// section sits directly on the page background, like the pillars
// section. Each card sits in front of a tall rectangle outline with a
// modestly rounded top (a lightweight arch motif, matching the dome
// shapes used elsewhere on the page) that's noticeably taller than the
// card's own content and has no bottom border — so it reads as "cut
// off" partway down rather than a fully closed box, per the mockup.
export default function TestimonialsSection() {
  return (
    <section className="bg-ivory px-6 py-14">
      <div className="mx-auto" style={{ maxWidth: "calc(72rem + 6cm)" }}>
        <Reveal className="flex items-center justify-center gap-3">
          <ScallopBadge n={6} />
          <h2 className="font-heading text-2xl text-navy sm:text-3xl">Apa Kata Orang Tua?</h2>
        </Reveal>

        <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} className="relative h-full">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 top-0 rounded-t-[20%] border border-b-0 border-navy/10"
                style={{ height: "calc(70% + 3cm)" }}
              />

              <div className="relative flex h-full flex-col px-5 pt-8 pb-6">
                <Quote className="h-6 w-6 -scale-x-100 text-gold" fill="currentColor" aria-hidden="true" />
                <p className="mt-3 text-sm leading-relaxed text-navy/80">{t.quote}</p>

                <div className="mt-auto flex items-center gap-3 pt-6">
                  <Avatar />
                  <div>
                    <p className="font-heading text-sm font-bold text-navy">{t.name}</p>
                    <p className="text-xs text-navy/60">{t.relation}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
