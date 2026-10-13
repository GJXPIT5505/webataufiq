import React from "react";
import { Link } from "@inertiajs/react";

export default function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="Attaufiq — Beranda">
      <img
        src="/images/brand/logo-full-white.png"
        alt="Sekolah Islam Attaufiq — PG, TK, SD, SMP, SMA"
        className="h-9 w-auto md:h-10 object-contain"
      />
    </Link>
  );
}

