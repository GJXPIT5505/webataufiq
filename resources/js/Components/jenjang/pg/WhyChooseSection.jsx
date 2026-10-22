
import { Check } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

const PG_CHECKLIST = [
  "Lingkungan Islami yang aman, bersih, dan penuh kasih sayang",
  "Guru profesional dan berpengalaman di bidang PAUD Islam",
  "Kurikulum terpadu: nilai Islam, akademik, dan life skill",
  "Pembiasaan ibadah dan karakter sejak dini",
  "Kolaborasi erat antara sekolah dan orang tua",
];

// Section 2 — "Mengapa Memilih PG Attaufiq?" Photo is flush against the
// box's own top/left/bottom edges (no margin there — SectionBox itself
// has no padding for exactly this reason); the text column keeps its own
// padding. Title, photo, and checklist are props (defaulting to PG's own
// copy) so other jenjang detail pages can reuse this exact component
// with just their own heading/photo/checklist swapped in.
export default function WhyChooseSection({
  title = "Mengapa Memilih PG Attaufiq?",
  photoSrc = "/images/jenjang/pg-hero.jpg",
  checklist = PG_CHECKLIST,
}) {
  return (
    <section className="bg-ivory px-6 py-14">
      <div className="mx-auto" style={{ maxWidth: "calc(72rem + 6cm)" }}>
        <Reveal>
          <SectionBox>
            <div className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-8">
              <div className="relative min-h-[260px] w-full sm:min-h-full">
                <img src={photoSrc} alt={title} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col justify-center px-6 py-6 sm:px-0 sm:py-8 sm:pr-8">
                <div className="flex items-center gap-3">
                  <ScallopBadge n={2} />
                  <h2 className="font-heading text-2xl text-navy sm:text-3xl">
                    {title}
                  </h2>
                </div>

                <ul className="mt-6 flex flex-col gap-4">
                  {checklist.map((item, i) => (
                    <li key={item}>
                      <Reveal delay={i * 0.08} className="flex items-start gap-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/20">
                          <Check aria-hidden="true" className="h-3.5 w-3.5 text-gold" strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-relaxed text-navy/80 sm:text-base">
                          {item}
                        </span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}
