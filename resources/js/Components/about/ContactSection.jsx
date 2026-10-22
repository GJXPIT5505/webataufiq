import React from "react";
import { Sun, PhoneCall, Clock, MessageCircle, Users, MapPin, ChevronRight } from "lucide-react";
import { PgtkIcon, SmpIcon } from "./FaqSection";
import Reveal from "@/Components/home/Reveal";
import { WhatsappIcon } from "@/Components/Footer";

const CAMPUSES = [
  {
    Icon: PgtkIcon,
    name: "PG-TK-SD Attaufiq",
    description: "Kami siap membantu kebutuhan informasi untuk jenjang PG, TK dan SD.",
    whatsapp: { number: "0852-6879-7915", href: "https://wa.me/6285268797915" },
    phone: { number: "0741-XXXXXXX", href: "tel:0741XXXXXXX" },
    mapLabel: "PG-TK-SD ATTAUFIQ",
    address: "Jl. Attaufiq No.1, Simpang IV Sipin, Kec. Telanaipura, Kota Jambi, Jambi 36124",
  },
  {
    Icon: SmpIcon,
    name: "SMP-SMA Attaufiq",
    description: "Kami siap membantu kebutuhan informasi untuk jenjang SMP dan SMA.",
    whatsapp: { number: "0819-2742-1650", href: "https://wa.me/6281927421650" },
    phone: { number: "0741-XXXXXXX", href: "tel:0741XXXXXXX" },
    mapLabel: "SMP-SMA ATTAUFIQ",
    address: "Jl. Sunan Gunung Jati No.88, Thehok, Kec. Jambi Selatan, Kota Jambi, Jambi 36139",
  },
];

const INFO_ITEMS = [
  {
    Icon: Clock,
    title: "Jam Operasional",
    body: (
      <>
        Senin - Jumat : 07.00 - 16.00 WIB
        <br />
        Sabtu : 07.00 - 12.00 WIB
        <br />
        <span className="text-navy/50">*Minggu dan hari libur nasional tutup</span>
      </>
    ),
  },
  {
    Icon: MessageCircle,
    title: "Respon Cepat",
    body: "Tim kami akan merespon pesan Anda secepat mungkin di jam operasional.",
  },
  {
    Icon: Users,
    title: "Konsultasi Langsung",
    body: "Bunda/Ayah juga dapat berkonsultasi langsung dengan tim kami di sekolah dengan membuat janji terlebih dahulu.",
  },
];

function SectionHeading({ children }) {
  return (
    <div className="text-center">
      <h2 className="font-heading text-3xl text-navy sm:text-4xl">{children}</h2>
      <div className="mx-auto mt-3 flex max-w-[140px] items-center gap-3">
        <span className="h-px flex-1 bg-gold/50" />
        <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
        <span className="h-px flex-1 bg-gold/50" />
      </div>
    </div>
  );
}

function IconBadge({ children, className = "" }) {
  return (
    <span
      className={`grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy ${className}`}
    >
      <span className="h-7 w-7 text-white">{children}</span>
    </span>
  );
}

function MapEmbed({ address }) {
  return (
    <iframe
      title={address}
      src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-ivory px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading>Hubungi Kami</SectionHeading>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CAMPUSES.map((campus, i) => (
            <Reveal
              key={campus.name}
              delay={i * 0.1}
              className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <IconBadge>
                  <campus.Icon />
                </IconBadge>
                <div>
                  <h3 className="font-heading text-lg text-navy">{campus.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/60">{campus.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={campus.whatsapp.href}
                  className="flex items-center gap-3 rounded-xl border border-navy/10 bg-ivory/50 px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366]">
                    <WhatsappIcon className="h-5 w-5 text-white" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs text-navy/50">WhatsApp</span>
                    <span className="block text-sm font-semibold text-navy">
                      {campus.whatsapp.number}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-navy/30" />
                </a>

                <a
                  href={campus.phone.href}
                  className="flex items-center gap-3 rounded-xl border border-navy/10 bg-ivory/50 px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold">
                    <PhoneCall aria-hidden="true" className="h-4.5 w-4.5 text-navy" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs text-navy/50">Telepon / HP</span>
                    <span className="block text-sm font-semibold text-navy">
                      {campus.phone.number}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-navy/30" />
                </a>
              </div>
            </Reveal>
          ))}

          <Reveal delay={CAMPUSES.length * 0.1} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              {INFO_ITEMS.map(({ Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 0.08} className="flex items-start gap-4">
                  <IconBadge>
                    <Icon className="h-full w-full" strokeWidth={1.8} />
                  </IconBadge>
                  <div>
                    <h3 className="font-heading text-base text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy/60">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <SectionHeading>Lokasi Sekolah Kami</SectionHeading>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CAMPUSES.map((campus, i) => (
            <Reveal
              key={campus.name}
              delay={i * 0.12}
              className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
            >
              <div className="relative h-64 w-full">
                <span className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
                  <Sun aria-hidden="true" className="h-3.5 w-3.5 text-gold" />
                  {campus.mapLabel}
                </span>
                <MapEmbed address={campus.address} />
              </div>

              <div className="p-5">
                <p className="flex items-start gap-2 text-sm text-navy/70">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-navy/50" />
                  {campus.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                >
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                  Lihat di Google Maps
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

