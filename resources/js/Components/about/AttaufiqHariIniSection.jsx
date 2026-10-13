import React from "react";
import { Sun, Landmark, Users, Star } from "lucide-react";
import MoroccanPattern from "@/Components/home/MoroccanPattern";
import Reveal from "@/Components/home/Reveal";

const FEATURES = [
  {
    icon: Landmark,
    title: "Bertumbuh dengan Amanah",
    body: "Hingga hari ini, Attaufiq terus bertumbuh dengan amanah yang sama: menghadirkan pendidikan Islam yang berkualitas, relevan dengan zaman, dan tetap berlandaskan Al-Qur'an dan Sunnah.",
  },
  {
    icon: Users,
    title: "Melayani dengan Hati",
    body: "Attaufiq menaungi jenjang PG-TK, SD, SMP, hingga SMA dengan lingkungan belajar yang aman, nyaman, dan kondusif. Didukung oleh guru dan tenaga pendidik profesional yang peduli dan berkompeten.",
  },
  {
    icon: Star,
    title: "Mempersiapkan Generasi Terbaik",
    body: "Kami mempersiapkan generasi yang berilmu, berakhlak, berdaya saing global, dan siap menjadi pemimpin masa depan yang membawa kebaikan bagi umat, bangsa, dan dunia.",
  },
];

export default function AttaufiqHariIniSection() {
  return (
    <section className="relative overflow-hidden border-b border-gold/40 bg-navy px-6 py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
      >
        <MoroccanPattern className="h-full w-full" />
      </div>

      <Reveal className="relative mx-auto max-w-6xl text-center">
        <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
        <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">Attaufiq Hari Ini</h2>
      </Reveal>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-x-10 gap-y-16 md:grid-cols-[1.1fr_1fr] md:items-center">
        {/* Photo cluster */}
        <Reveal delay={0.1} className="relative pb-20 pr-16 sm:pb-24 sm:pr-20">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src="/images/about/hari-ini-besar.png"
              alt="Kampus Attaufiq"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-40 overflow-hidden rounded-xl border-4 border-navy shadow-xl sm:w-48">
            <img
              src="/images/about/hari-ini-kecil-1.jpg"
              alt="Santri Attaufiq belajar bersama"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="absolute bottom-24 right-0 w-40 overflow-hidden rounded-xl border-4 border-navy shadow-xl sm:bottom-28 sm:w-48">
            <img
              src="/images/about/hari-ini-kecil-2.jpg"
              alt="Santri Attaufiq dalam kegiatan sekolah"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Feature list */}
        <ol>
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="border-b border-dashed border-white/15 py-6 first:pt-0 last:border-0 last:pb-0"
            >
              <Reveal delay={0.1 + i * 0.08} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/60">
                  <Icon aria-hidden="true" className="h-5 w-5 text-gold" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

