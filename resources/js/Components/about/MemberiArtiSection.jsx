import React from "react";
import { Sun } from "lucide-react";
import Reveal from "@/Components/home/Reveal";

const LEFT_PATH =
  "M32.94,100 L32.94,44.68 C32.95,44.04 32.97,41.91 33,40.85 C33.03,39.79 33.05,39.15 33.12,38.3 C33.19,37.45 33.3,36.45 33.41,35.74 C33.52,35.03 33.67,34.47 33.77,34.04 C33.87,33.61 33.88,33.61 34,33.19 C34.12,32.77 34.36,31.91 34.5,31.49 C34.64,31.06 34.67,31.07 34.84,30.64 C35.01,30.21 35.34,29.37 35.54,28.94 C35.74,28.52 35.65,28.66 36.02,28.09 C36.39,27.52 36.92,26.38 37.75,25.53 C38.58,24.68 40.06,23.83 41.01,22.98 C41.96,22.13 42.91,21.28 43.44,20.43 C43.96,19.58 43.84,18.72 44.16,17.87 C44.48,17.02 44.84,16.17 45.35,15.32 C45.86,14.47 46.31,13.62 47.24,12.77 C48.17,11.92 49.64,11.06 50.93,10.21 C52.22,9.36 53.88,8.51 54.97,7.66 C56.06,6.81 56.74,5.96 57.46,5.11 C58.18,4.26 58.75,3.4 59.3,2.55 C59.84,1.7 60.49,0.42 60.73,0";
const RIGHT_PATH =
  "M60.73,0 C60.97,0.42 61.62,1.7 62.16,2.55 C62.71,3.4 63.28,4.26 64,5.11 C64.72,5.96 65.4,6.81 66.49,7.66 C67.58,8.51 69.24,9.36 70.53,10.21 C71.82,11.06 73.29,11.92 74.22,12.77 C75.15,13.62 75.6,14.47 76.11,15.32 C76.62,16.17 76.98,17.02 77.3,17.87 C77.62,18.72 77.5,19.58 78.02,20.43 C78.55,21.28 79.5,22.13 80.45,22.98 C81.4,23.83 82.88,24.68 83.71,25.53 C84.54,26.38 85.07,27.52 85.44,28.09 C85.81,28.66 85.72,28.52 85.92,28.94";
const FILL_PATH = `${LEFT_PATH} ${RIGHT_PATH.slice(RIGHT_PATH.indexOf(" C"))} L85.92,100`;

const ARCH_BOX_LEFT = "9.44%";
const ARCH_BOX_WIDTH = "calc(47.2% + 1.164cm)";

export default function MemberiArtiSection() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to right, black 0%, black 40%, transparent 58%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 40%, transparent 58%)",
        }}
      >
        <img
          src="/images/about/memberi-arti-bg-1.png"
          alt=""
          className="h-full w-full object-contain object-left"
        />
      </div>

      <div className="relative grid min-h-[520px] md:min-h-[640px] md:grid-cols-2">
        <div className="absolute inset-y-0" style={{ left: ARCH_BOX_LEFT, width: ARCH_BOX_WIDTH }}>
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="memberi-arti-arch-fade" gradientUnits="userSpaceOnUse" x1="60.73" y1="0" x2="85.92" y2="28.94">
                <stop offset="0%" stopColor="#FDD000" stopOpacity="1" />
                <stop offset="100%" stopColor="#FDD000" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="memberi-arti-fill-fade" gradientUnits="userSpaceOnUse" x1="32.94" y1="50" x2="85.92" y2="50">
                <stop offset="0%" stopColor="#102380" stopOpacity="0.4" />
                <stop offset="55%" stopColor="#102380" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#102380" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={FILL_PATH} fill="url(#memberi-arti-fill-fade)" />
            <path d={LEFT_PATH} fill="none" stroke="#FDD000" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path
              d={RIGHT_PATH}
              fill="none"
              stroke="url(#memberi-arti-arch-fade)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <Reveal className="relative z-10 flex h-full flex-col items-center justify-center px-4 pl-[21%] text-center">
            <span className="font-heading text-[6.75rem] leading-none text-gold">&ldquo;</span>
            <p className="font-heading mt-2 max-w-xs text-3xl leading-snug text-white sm:text-4xl">
              Setiap anak adalah amanah, setiap langkah pendidikan adalah
              kesempatan untuk memberi arti.
            </p>
            <div className="mt-5 h-px w-24 bg-gold/60" />
            <span className="font-heading mt-2 text-[6.75rem] leading-none text-gold">&rdquo;</span>
          </Reveal>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-[2px] -translate-y-1/2 bg-gold/30 md:block"
        />

        <Reveal
          delay={0.15}
          className="relative col-start-2 flex flex-col items-center justify-center px-6 py-14 text-center md:px-10 md:py-16"
        >
          <p className="text-white/90">Itulah sebabnya kami hadir,</p>

          <img
            src="/images/about/tagline-memberi-arti-gold.png"
            alt="Memberi Arti itu Attaufiq"
            className="mt-4 h-auto w-full max-w-sm"
          />

          <div className="mt-5 flex w-full max-w-[220px] items-center gap-3">
            <span className="h-px flex-1 bg-gold/50" />
            <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
            <span className="h-px flex-1 bg-gold/50" />
          </div>

          <p className="mt-5 max-w-md leading-relaxed text-white/70">
            Attaufiq berkomitmen untuk terus menjadi rumah pendidikan Islam
            yang memberikan arti, membimbing, dan mengantarkan setiap anak
            menuju masa depan terbaiknya.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

