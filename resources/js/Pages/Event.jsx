import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import PageHeroBanner from "@/Components/PageHeroBanner";
import EventsGridSection from "@/Components/events/EventsGridSection";

export default function EventIndex({ events = [] }) {
  return (
    <AppLayout title="Events - SIT At-Taufiq">
      <Head title="Events & Agenda Kegiatan | SIT At-Taufiq Jambi" />

      {/* Hero Banner disesuaikan dengan komponen PageHeroBanner dari Claude TSX */}
      <PageHeroBanner
        heading="Events"
        subheading={[
          "Ikuti berbagai agenda dan kegiatan",
          "yang berlangsung di Attaufiq.",
        ]}
        photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
      />

      <EventsGridSection items={events} />
    </AppLayout>
  );
}