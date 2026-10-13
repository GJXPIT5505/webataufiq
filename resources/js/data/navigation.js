import { jenjangList } from "./jenjang";
import { eventsList } from "./events";
import { programsList } from "./programs";

// Struktur navbar utama. Submenu Jenjang/Events/Programs digenerate dari data
// array masing-masing (src/data/jenjang.js, events.js, programs.js) — nambah
// atau hapus item di sana otomatis muncul/hilang di navbar.
export function getNavItems() {
  return [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "FAQ", href: "/about#faq" },
        { label: "Sejarah", href: "/about#sejarah" },
        { label: "Contact Us", href: "/about#contact" },
      ],
    },
    {
      label: "Jenjang",
      href: "/jenjang",
      children: [...jenjangList]
        .sort((a, b) => a.order - b.order)
        .map((j) => ({ label: j.name, href: `/${j.slug}` })),
    },
    { label: "Admission", href: "/admission" },
    {
      label: "Events",
      href: "/events",
      children: eventsList.map((e) => ({
        label: e.title,
        href: `/events?event=${e.slug}`,
      })),
    },
    {
      label: "Programs",
      href: "/programs",
      children: programsList.map((p) => ({
        label: p.title,
        href: `/programs?program=${p.slug}`,
      })),
    },
    { label: "Blog", href: "/blog" },
  ];
}

