import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import PageHeroBanner from "@/Components/PageHeroBanner";
import ProgramsGridSection from "@/Components/programs/ProgramsGridSection";

export default function ProgramIndex({ events = [] }) {
  return (
    <AppLayout title="Programs - SIT At-Taufiq">
      <Head title="Programs & Program Unggulan | SIT At-Taufiq Jambi" />

      {/* Hero Banner disesuaikan dengan komponen PageHeroBanner dari Claude TSX */}
      <PageHeroBanner
        heading="Programs"
        subheading={[
          "Program unggulan yang dirancang",
          "untuk tumbuh kembang ananda.",
        ]}
        photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
      />

      <ProgramsGridSection items={events} />
    </AppLayout>
  );
}