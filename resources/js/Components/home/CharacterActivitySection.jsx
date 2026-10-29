import { LinkButton } from "@/Components/ui/Button";
import ResponsiveSwitch from "@/Components/ResponsiveSwitch";
import ActivityCardGrid from "@/Components/home/ActivityCardGrid";
import ActivityRail from "@/Components/home/ActivityRail";
import FloatingElement from "@/Components/home/FloatingElement";
import Reveal from "./Reveal";

const activityHeading = (
  <Reveal className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold text-navy md:text-4xl">
      Belajar yang Tak Berhenti di Kelas
    </h2>
    <p className="mt-4 text-base leading-relaxed text-navy/70">
      Setiap kegiatan dirancang untuk membentuk karakter, cara berpikir, dan
      rasa percaya diri ananda, bukan hanya nilai di atas kertas.
    </p>
  </Reveal>
);

export default function CharacterActivitySection() {
  return (
    <section className="relative overflow-clip bg-ivory">
      {/* Foto arch dekoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 h-[36rem] w-14 overflow-hidden opacity-70 md:inset-y-0 md:h-auto md:w-40 md:opacity-90 lg:w-56"
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
        className="pointer-events-none absolute right-0 top-0 z-0 h-[36rem] w-14 overflow-hidden opacity-70 md:inset-y-0 md:h-auto md:w-40 md:opacity-90 lg:w-56"
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
        className="pointer-events-none absolute left-1 top-3 z-0 w-12 opacity-80 md:left-40 md:top-6 md:w-44 md:opacity-90 lg:left-56 lg:top-8 lg:w-56"
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
        className="pointer-events-none absolute right-1 top-[24rem] z-0 h-36 w-7 overflow-hidden opacity-80 md:right-[236px] md:top-[280px] md:h-[350px] md:w-20 md:opacity-90 lg:right-[300px] lg:top-[518px] lg:h-[485px] lg:w-28"
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
        <ResponsiveSwitch
          mobile={<ActivityRail heading={activityHeading} />}
          desktop={
            <>
              {activityHeading}
              <ActivityCardGrid />
            </>
          }
        />

        <div className="mt-8 flex items-center justify-center gap-3 sm:mt-12 sm:gap-4">
          <LinkButton href="/events" variant="navy-hover-gold" className="flex-1 px-4 sm:flex-none sm:px-6">
            More Events
          </LinkButton>
          <LinkButton href="/programs" variant="navy-hover-gold" className="flex-1 px-4 sm:flex-none sm:px-6">
            More Programs
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
