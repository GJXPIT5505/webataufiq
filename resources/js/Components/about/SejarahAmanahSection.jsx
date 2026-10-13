import React from "react";
import { Sun } from "lucide-react";
import MoroccanPattern from "@/Components/home/MoroccanPattern";
import Reveal from "@/Components/home/Reveal";

export default function SejarahAmanahSection() {
  return (
    <section id="sejarah" className="relative scroll-mt-20 overflow-hidden bg-ivory px-6 py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-[0.06]"
        style={{
          WebkitMaskImage: "radial-gradient(circle at 100% 0%, black 0%, black 40%, transparent 75%)",
          maskImage: "radial-gradient(circle at 100% 0%, black 0%, black 40%, transparent 75%)",
        }}
      >
        <MoroccanPattern className="h-full w-full" />
      </div>

      <Reveal className="relative mx-auto max-w-5xl text-center">
        <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />

        <div className="mx-auto mt-3 flex max-w-xs items-center gap-3">
          <span className="h-px flex-1 bg-gold/50" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Tentang Attaufiq
          </span>
          <span className="h-px flex-1 bg-gold/50" />
        </div>

        <h2 className="font-heading mt-3 text-3xl font-bold text-navy sm:text-4xl">Awal Sebuah Amanah</h2>

        <div className="mx-auto mt-3 flex max-w-[140px] items-center gap-3">
          <span className="h-px flex-1 bg-gold/50" />
          <span className="text-sm font-semibold text-gold">1982</span>
          <span className="h-px flex-1 bg-gold/50" />
        </div>
      </Reveal>

      <div className="relative mx-auto mt-12 grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal delay={0.1} className="mx-auto -rotate-2 rounded-sm bg-white p-3 pb-6 shadow-xl">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-1 bg-ivory-dark/70"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
            />
            <img
              src="/images/about/sejarah-1982.jpg"
              alt="Gerbang Yayasan Pendidikan Attaufiq, 1982"
              className="h-auto w-full max-w-md object-cover rounded-sm"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="leading-relaxed text-navy/80">
            Attaufiq berawal dari sebuah amanah dan kepedulian untuk
            menghadirkan pendidikan Islam yang tidak hanya mengajarkan
            ilmu, tetapi juga menanamkan nilai-nilai Al-Qur&rsquo;an dan
            Sunnah dalam kehidupan anak.
          </p>
          <p className="mt-4 leading-relaxed text-navy/80">
            Pada tahun <strong className="font-semibold text-navy">1982</strong>,
            lahirlah <strong className="font-semibold text-navy">Yayasan
            Pendidikan Attaufiq</strong> dengan cita-cita besar membentuk
            generasi beriman, berakhlak mulia, dan{" "}
            <strong className="font-semibold text-navy">berprestasi</strong> yang
            mampu memberi manfaat bagi umat dan bangsa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

