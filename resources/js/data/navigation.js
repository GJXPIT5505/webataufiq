import { jenjangList } from "./jenjang";
import { eventsList } from "./events";
import { programsList } from "./programs";

// Struktur navbar utama.
// Submenu Events & Programs dapat menerima data dinamis dari database (via Inertia props).
// Jika database belum diisi, otomatis menggunakan fallback static data.
export function getNavItems({ navEvents = [], navPrograms = [] } = {}) {
  const eventsData = navEvents && navEvents.length > 0 ? navEvents : eventsList;
  const programsData = navPrograms && navPrograms.length > 0 ? navPrograms : programsList;

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
      children: eventsData.map((e) => ({
        label: e.title,
        href: `/events?event=${e.slug}`,
      })),
    },
    {
      label: "Programs",
      href: "/programs",
      children: programsData.map((p) => ({
        label: p.title,
        href: `/programs?program=${p.slug}`,
      })),
    },
    { label: "Blog", href: "/blog" },
  ];
}
