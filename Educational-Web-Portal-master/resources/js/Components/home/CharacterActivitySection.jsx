import { LinkButton } from "@/Components/ui/Button"; // Sesuaikan huruf kapital folder Components
import ActivityCardGrid from "@/Components/home/ActivityCardGrid";
import FloatingElement from "@/Components/home/FloatingElement";
import Reveal from "./Reveal";

// Blok "Karakter" (dulu Tagline) dan blok "Aktivitas" berbagi satu canvas
// ivory (foto arch + swoosh dekoratif melintasi keduanya), jadi harus jadi
// satu komponen, bukan dua section yang cuma di-stack.
export default function CharacterActivitySection() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* Foto arch dekoratif, menempel tepi kiri & kanan canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-40 overflow-hidden opacity-90 md:block lg:w-56"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 55%, transparent 100%)",
        }}
      >
        <img
          src="/images/home/section2-photo-left.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-40 overflow-hidden opacity-90 md:block lg:w-56"
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 55%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 0%, black 55%, transparent 100%)",
        }}
      >
        <img
          src="/images/home/section2-photo-right.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Swoosh dekoratif */}
      <FloatingElement
        className="pointer-events-none absolute top-2 z-0 hidden w-40 opacity-90 md:left-40 md:top-6 md:block md:w-44 lg:left-56 lg:top-8 lg:w-56"
        range={20}
        duration={2.2}
      >
        <img
          src="/images/home/section2-swoosh-kuning.png"
          alt=""
          className="h-auto w-full"
        />
      </FloatingElement>
      <FloatingElement
        className="pointer-events-none absolute z-0 hidden w-20 overflow-hidden opacity-90 md:right-[236px] md:top-[280px] md:block md:h-[350px] lg:right-[300px] lg:top-[518px] lg:h-[485px] lg:w-28"
        range={26}
        duration={2.6}
        delay={0.6}
      >
        <img
          src="/images/home/section2-swoosh-biru.png"
          alt=""
          className="h-full w-full object-cover object-top"
        />
      </FloatingElement>

      {/* BLOK 1 — Karakter */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 pt-20 text-center md:pt-28">
        <Reveal>
          <img
            src="/images/home/section2-logo-center.png"
            alt="Memberi Arti itu Attaufiq"
            className="mx-auto h-60 w-auto md:h-72"
          />
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy/80 md:text-lg">
            Di Attaufiq, setiap proses belajar dirancang agar ananda: paham,
            bukan sekadar hafal; berkembang, bukan sekadar ikut; punya arah,
            bukan sekadar jalan. Karena bagi kami, pendidikan harus memberi
            arti.
          </p>
          <div className="mt-6">
            <LinkButton href="/about">Kenali Lebih Dekat</LinkButton>
          </div>
        </Reveal>
      </div>

      {/* BLOK 2 — Aktivitas */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy md:text-4xl">
            Belajar yang Tak Berhenti di Kelas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy/70">
            Setiap kegiatan dirancang untuk membentuk karakter, cara
            berpikir, dan rasa percaya diri ananda, bukan hanya nilai di atas
            kertas.
          </p>
        </Reveal>

        <ActivityCardGrid />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <LinkButton href="/events" variant="navy-hover-gold">
            More Events
          </LinkButton>
          <LinkButton href="/programs" variant="navy-hover-gold">
            More Programs
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
