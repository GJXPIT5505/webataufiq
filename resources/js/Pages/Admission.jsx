import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import PageHeroBanner from "@/Components/PageHeroBanner";
import PeriodeSection from "@/Components/Admission/PeriodeSection";
import AlurSection from "@/Components/Admission/AlurSection";
import PersyaratanSection from "@/Components/Admission/PersyaratanSection";
import FaqAdmissionSection from "@/Components/Admission/FaqAdmissionSection";

export default function AdmissionIndex() {
  return (
    <AppLayout title="Penerimaan Murid Baru - SIT At-Taufiq">
      <Head title="Admission & Pendaftaran PMB | SIT At-Taufiq Jambi" />

      <div className="w-full overflow-x-clip">
        {/* 1. Hero Section */}
        <PageHeroBanner
          heading="Admission"
          subheading={[
            "Bunda dan Ayah, berikut alur",
            "pendaftaran ananda di Attaufiq.",
          ]}
          photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
          revealNotchBehind
        />

        {/* 2. Periode Pendaftaran */}
        <PeriodeSection />

        {/* 3. Alur Pendaftaran */}
        <AlurSection />

        {/* 4. Persyaratan Pendaftaran */}
        <PersyaratanSection />

        {/* 5. FAQ Admission */}
        <FaqAdmissionSection />
      </div>
    </AppLayout>
  );
}
