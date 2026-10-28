import Reveal from "@/Components/home/Reveal";

const MISI_ITEMS = [
  "Menyelenggarakan pendidikan Islam yang berkualitas dan integratif.",
  "Menanamkan nilai-nilai Al-Qur'an dan Sunnah dalam kehidupan sehari-hari.",
  "Mengembangkan potensi akademik, karakter, dan keterampilan siswa.",
  "Menciptakan lingkungan belajar yang aman, nyaman, dan inspiratif.",
  "Membangun kemitraan dengan orang tua dan masyarakat untuk bersama-sama mendidik generasi terbaik.",
];

const ARCH_PATH =
  "M122.5,0 C128.2,4.5 145.4,19.4 156.8,26.9 C168.2,34.4 180.9,37.9 191.1,44.9 C201.3,51.8 211.9,59.8 218.1,68.8 C224.2,77.7 223.8,90.7 227.9,98.7 C231.9,106.6 239.7,105.6 242.6,116.6 C245.4,127.6 244.6,156.5 245,164.5 L245,296 Q245,299 242.6,299 L2.4,299 Q0,299 0,296 L0,164.5 C0.4,156.5 -0.4,127.6 2.4,116.6 C5.3,105.6 13.1,106.6 17.1,98.7 C21.2,90.7 20.8,77.7 26.9,68.8 C33.1,59.8 43.7,51.8 53.9,44.9 C64.1,37.9 76.8,34.4 88.2,26.9 C99.6,19.4 116.8,4.5 122.5,0 Z";

function ArchBadge({ children }) {
  return (
    <div className="relative h-28 w-24 shrink-0 drop-shadow-[0_6px_10px_rgba(16,35,128,0.3)]">
      <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={ARCH_PATH} fill="#102380" />
        <path
          d={ARCH_PATH}
          fill="none"
          stroke="#FDD000"
          strokeWidth="5"
          transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
        />
        {children}
      </svg>
    </div>
  );
}

export function BookSunIcon() {
  return (
    <g transform="translate(55.8,87.6) scale(0.85)" fill="none" stroke="#FDD000" strokeWidth="3.3" strokeLinecap="round">
      <path d="M49.5,60 A27.5,27.5 0 0 1 104.5,60" />
      <line x1="45" y1="42" x2="20" y2="32" />
      <line x1="52" y1="33" x2="33" y2="17" />
      <line x1="64" y1="27" x2="58" y2="7" />
      <line x1="77" y1="28" x2="77" y2="8" />
      <line x1="90" y1="27" x2="96" y2="7" />
      <line x1="102" y1="33" x2="121" y2="17" />
      <line x1="109" y1="42" x2="134" y2="32" />

      <path d="M77,78 C55,79 20,80 9,77 L10,153 C30,151 50,151 61,151 L77,158" strokeLinejoin="round" />
      <path d="M77,78 C99,79 134,80 145,77 L148,153 C128,151 108,151 93,151 L77,158" strokeLinejoin="round" />
      <path d="M77,78 Q77,118 77,158" />

      <path
        d="M23,98 Q43,99 63,102 M23,113 Q43,114 63,117 M23,128 Q43,129 63,132"
        strokeWidth="2.6"
      />
      <path
        d="M131,98 Q111,99 91,102 M131,113 Q111,114 91,117 M131,128 Q111,129 91,132"
        strokeWidth="2.6"
      />
    </g>
  );
}

function TargetArrowIcon() {
  return (
    <g transform="translate(57.9,92.7) scale(2.6917)" fill="none" stroke="#FDD000" strokeWidth="0.6">
      <circle cx="24" cy="24" r="17.5" />
      <circle cx="24" cy="24" r="11.5" />
      <circle cx="24" cy="24" r="5.5" />
      <circle cx="24" cy="24" r="1.8" fill="#FDD000" />
      <line x1="44" y1="4" x2="27.5" y2="20.5" strokeLinecap="round" />
      <path d="M38,2.5 L44,4 L42.5,10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25.5,22 L28,16 L32,20 Z" fill="#FDD000" stroke="none" />
    </g>
  );
}

const SCALLOP_PATH =
  "M37.94,20.0 C37.94,20.39 37.83,20.79 37.64,21.16 C37.46,21.53 37.16,21.89 36.83,22.22 C36.5,22.55 36.07,22.84 35.69,23.12 C35.3,23.4 34.88,23.64 34.52,23.89 C34.17,24.14 33.82,24.35 33.56,24.6 C33.3,24.85 33.11,25.09 32.99,25.38 C32.87,25.67 32.84,25.98 32.84,26.33 C32.85,26.68 32.94,27.08 33.02,27.51 C33.1,27.94 33.23,28.42 33.3,28.89 C33.37,29.36 33.46,29.87 33.46,30.33 C33.46,30.79 33.42,31.27 33.29,31.66 C33.16,32.05 32.96,32.42 32.69,32.69 C32.42,32.96 32.05,33.16 31.66,33.29 C31.27,33.42 30.79,33.46 30.33,33.46 C29.87,33.46 29.36,33.37 28.89,33.3 C28.42,33.23 27.94,33.1 27.51,33.02 C27.08,32.94 26.68,32.85 26.33,32.84 C25.98,32.84 25.67,32.87 25.38,32.99 C25.09,33.11 24.85,33.3 24.6,33.56 C24.35,33.82 24.14,34.17 23.89,34.52 C23.64,34.88 23.4,35.3 23.12,35.69 C22.84,36.07 22.55,36.5 22.22,36.83 C21.89,37.16 21.53,37.46 21.16,37.64 C20.79,37.83 20.39,37.94 20.0,37.94 C19.61,37.94 19.21,37.83 18.84,37.64 C18.47,37.46 18.11,37.16 17.78,36.83 C17.45,36.5 17.16,36.07 16.88,35.69 C16.6,35.3 16.36,34.88 16.11,34.52 C15.86,34.17 15.65,33.82 15.4,33.56 C15.15,33.3 14.91,33.11 14.62,32.99 C14.33,32.87 14.02,32.84 13.67,32.84 C13.32,32.85 12.92,32.94 12.49,33.02 C12.06,33.1 11.58,33.23 11.11,33.3 C10.64,33.37 10.13,33.46 9.67,33.46 C9.21,33.46 8.73,33.42 8.34,33.29 C7.95,33.16 7.58,32.96 7.31,32.69 C7.04,32.42 6.84,32.05 6.71,31.66 C6.58,31.27 6.54,30.79 6.54,30.33 C6.54,29.87 6.63,29.36 6.7,28.89 C6.77,28.42 6.9,27.94 6.98,27.51 C7.06,27.08 7.16,26.68 7.16,26.33 C7.16,25.98 7.13,25.67 7.01,25.38 C6.89,25.09 6.7,24.85 6.44,24.6 C6.18,24.35 5.84,24.14 5.48,23.89 C5.12,23.64 4.69,23.4 4.31,23.12 C3.92,22.84 3.5,22.55 3.17,22.22 C2.84,21.89 2.54,21.53 2.36,21.16 C2.17,20.79 2.06,20.39 2.06,20.0 C2.06,19.61 2.17,19.21 2.36,18.84 C2.54,18.47 2.84,18.11 3.17,17.78 C3.5,17.45 3.92,17.16 4.31,16.88 C4.69,16.6 5.12,16.36 5.48,16.11 C5.84,15.86 6.18,15.65 6.44,15.4 C6.7,15.15 6.89,14.91 7.01,14.62 C7.13,14.33 7.16,14.02 7.16,13.67 C7.16,13.32 7.06,12.92 6.98,12.49 C6.9,12.06 6.77,11.58 6.7,11.11 C6.63,10.64 6.54,10.13 6.54,9.67 C6.54,9.21 6.58,8.73 6.71,8.34 C6.84,7.95 7.04,7.58 7.31,7.31 C7.58,7.04 7.95,6.84 8.34,6.71 C8.73,6.58 9.21,6.54 9.67,6.54 C10.13,6.54 10.64,6.63 11.11,6.7 C11.58,6.77 12.06,6.9 12.49,6.98 C12.92,7.06 13.32,7.16 13.67,7.16 C14.02,7.16 14.33,7.13 14.62,7.01 C14.91,6.89 15.15,6.7 15.4,6.44 C15.65,6.18 15.86,5.84 16.11,5.48 C16.36,5.12 16.6,4.69 16.88,4.31 C17.16,3.92 17.45,3.5 17.78,3.17 C18.11,2.84 18.47,2.54 18.84,2.36 C19.21,2.17 19.61,2.06 20.0,2.06 C20.39,2.06 20.79,2.17 21.16,2.36 C21.53,2.54 21.89,2.84 22.22,3.17 C22.55,3.5 22.84,3.92 23.12,4.31 C23.4,4.69 23.64,5.12 23.89,5.48 C24.14,5.84 24.35,6.18 24.6,6.44 C24.85,6.7 25.09,6.89 25.38,7.01 C25.67,7.13 25.98,7.16 26.33,7.16 C26.68,7.16 27.08,7.06 27.51,6.98 C27.94,6.9 28.42,6.77 28.89,6.7 C29.36,6.63 29.87,6.54 30.33,6.54 C30.79,6.54 31.27,6.58 31.66,6.71 C32.05,6.84 32.42,7.04 32.69,7.31 C32.96,7.58 33.16,7.95 33.29,8.34 C33.42,8.73 33.46,9.21 33.46,9.67 C33.46,10.13 33.37,10.64 33.3,11.11 C33.23,11.58 33.1,12.06 33.02,12.49 C32.94,12.92 32.85,13.32 32.84,13.67 C32.84,14.02 32.87,14.33 32.99,14.62 C33.11,14.91 33.3,15.15 33.56,15.4 C33.82,15.65 34.17,15.86 34.52,16.11 C34.88,16.36 35.3,16.6 35.69,16.88 C36.07,17.16 36.5,17.45 36.83,17.78 C37.16,18.11 37.46,18.47 37.64,18.84 C37.83,19.21 37.94,19.61 37.94,20.0 Z";

export function ScallopBadge({ n }) {
  return (
    <div className="relative mt-0.5 h-7 w-7 shrink-0 drop-shadow-[0_2px_3px_rgba(16,35,128,0.3)]">
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={SCALLOP_PATH} fill="#FDD000" />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xs font-bold text-[#002672]">{n}</span>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <>
      <h2 className="font-heading text-3xl text-[#002672]">{children}</h2>
      <div className="mt-2 flex max-w-[150px] items-center gap-3">
        <span className="h-px flex-1 bg-[#FDD000]/60" />
        <span aria-hidden="true" className="text-[#FDD000]">
          ✦
        </span>
      </div>
    </>
  );
}

export default function VisiMisiSection() {
  return (
    <section className="bg-ivory px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        {/* Visi */}
        <Reveal className="relative min-w-0 overflow-hidden rounded-[2rem] border border-gold/40 bg-ivory shadow-sm">
          <div className="relative z-10 p-6 sm:p-8 md:p-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
              <ArchBadge>
                <BookSunIcon />
              </ArchBadge>
              <div className="min-w-0 flex-1 pt-1">
                <SectionHeading>Visi</SectionHeading>
                <p className="mt-3 leading-relaxed text-navy/80">
                  Menjadi lembaga pendidikan Islam unggulan yang melahirkan
                  generasi beriman, berilmu, berakhlak mulia, dan
                  berprestasi menuju ridha Allah.
                </p>
              </div>
            </div>
          </div>
          <img
            src="/images/about/building-cropped.png"
            alt=""
            className="pointer-events-none absolute bottom-0 left-0 right-0 w-full h-auto object-cover object-bottom"
            style={{
              opacity: 0.4,
              filter: "none",
              mixBlendMode: "normal",
              transform: "scale(1.1) translateY(22px)",
              transformOrigin: "bottom center",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          />
        </Reveal>

        {/* Misi */}
        <Reveal delay={0.12} className="min-w-0 rounded-[2rem] border border-gold/40 bg-ivory p-6 shadow-sm sm:p-8 md:p-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
            <ArchBadge>
              <TargetArrowIcon />
            </ArchBadge>
            <div className="min-w-0 flex-1 pt-1">
              <SectionHeading>Misi</SectionHeading>
              <ol className="mt-3">
                {MISI_ITEMS.map((item, i) => (
                  <li
                    key={i}
                    className="border-b border-navy/10 py-3.5 first:pt-0 last:border-0 last:pb-0"
                  >
                    <Reveal delay={0.05 * i} className="flex items-start gap-4">
                      <ScallopBadge n={i + 1} />
                      <p className="text-sm leading-relaxed text-navy/80">{item}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
