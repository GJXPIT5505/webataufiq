import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import PageHeroBanner from '@/Components/PageHeroBanner';
import VisiMisiSection from '@/Components/about/VisiMisiSection';
import SejarahAmanahSection from '@/Components/about/SejarahAmanahSection';
import AttaufiqHariIniSection from '@/Components/about/AttaufiqHariIniSection';
import MemberiArtiSection from '@/Components/about/MemberiArtiSection';
import FaqSection from '@/Components/about/FaqSection';
import ContactSection from '@/Components/about/ContactSection';

export default function About() {
  return (
    <AppLayout title="About Us - SIT At-Taufiq">
      <Head title="About Us | SIT At-Taufiq Jambi" />

      {/* Hero Banner disesuaikan dengan komponen PageHeroBanner dari Claude TSX */}
      <PageHeroBanner
        heading="About Us"
        subheading={[
          "Islam + Future Ready — mengenal lebih dekat",
          "Sekolah Islam Plus Tahfizh Attaufiq.",
        ]}
        photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
      />

      <VisiMisiSection />
      <SejarahAmanahSection />
      <AttaufiqHariIniSection />
      <MemberiArtiSection />
      <FaqSection />
      <ContactSection />
    </AppLayout>
  );
}