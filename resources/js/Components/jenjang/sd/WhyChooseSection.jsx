
import { Check } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

const SD_CHECKLIST = [
  "Lingkungan Islami yang aman, disiplin, dan penuh kasih sayang",
  "Guru profesional dan berpengalaman di bidang pendidikan dasar Islam",
  "Kurikulum terpadu: nilai Islam, akademik, dan tahfizh Al-Qur'an",
  "Pembiasaan ibadah dan pembentukan karakter setiap hari",
  "Kolaborasi erat antara sekolah dan orang tua",
];

// Section 2 — "Mengapa Memilih SD Attaufiq?" Photo is flush against the
// box's own top/left/bottom edges (no margin there — SectionBox itself
// has no padding for exactly this reason); the text column keeps its own
// padding.
export default function WhyChooseSection({
  title = "Mengapa Memilih SD Attaufiq?",
  photoSrc = "/images/jenjang/sd-hero.jpg",
  checklist = SD_CHECKLIST,
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
