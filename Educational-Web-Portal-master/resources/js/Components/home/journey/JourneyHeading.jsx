import { Sun } from "lucide-react";
import Reveal from "@/Components/home/Reveal";

export default function JourneyHeading() {
  return (
    <div className="relative pb-16 md:pb-24">
      {/* Spacer diperkecil nilainya agar padding atas tidak terlalu tinggi */}
      <div className="h-12 sm:h-16 md:h-24 lg:h-28 w-full pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        
        {/* Section Judul Utama */}
        <Reveal className="mx-auto max-w-2xl text-center">
          {/* Badge Matahari */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/15 shadow-sm">
            <Sun aria-hidden="true" className="h-6 w-6 text-[#D4AF37]" />
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#102380] md:text-4xl lg:text-5xl">
            Perjalanan Tumbuh Bersama Attaufiq
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#102380]/80 md:text-lg">
            Setiap langkah adalah awal dari masa depan. Kami mendampingi
            Ananda tumbuh dalam ilmu, akhlak, dan cinta kepada Allah hingga
            siap menjadi generasi beradab dan bermanfaat.
          </p>
        </Reveal>

        {/* Section Sub-Card Aesthetic dengan Background Putih */}
        <Reveal delay={0.15} className="mt-16 max-w-md md:mt-24">
          <div className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-8 shadow-xl shadow-[#102380]/5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
            {/* Aksen Hiasan Garis Vertikal Emas */}
            <div className="absolute inset-y-6 left-0 w-1.5 rounded-r-full bg-[#D4AF37]" />

            <h3 className="text-xl font-bold tracking-tight text-[#102380] md:text-2xl">
              Satu Perjalanan, Seumur Hidup
            </h3>
            
            <p className="mt-3 text-sm leading-relaxed text-[#102380]/75 md:text-base">
              Dari usia dini hingga remaja, Attaufiq menjadi rumah kedua yang
              mengantarkan Ananda menapaki tangga ilmu dan keberkahan menuju
              cahaya masa depan.
            </p>

            {/* Aksen Ornamen Belah Ketupat */}
            <div className="mt-6 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rotate-45 bg-[#D4AF37]"
              />
              <span className="h-[1px] w-12 bg-gradient-to-r from-[#D4AF37]/60 to-transparent" />
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}