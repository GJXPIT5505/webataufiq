import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import JenjangDetailHero from "@/Components/jenjang/pg/JenjangDetailHero";
import JenjangPillarsSection from "@/Components/jenjang/pg/JenjangPillarsSection";
import WhyChooseSection from "@/Components/jenjang/pg/WhyChooseSection";
import FacilitiesSection from "@/Components/jenjang/pg/FacilitiesSection";
import ActivitiesSection from "@/Components/jenjang/pg/ActivitiesSection";
import JoinSection from "@/Components/jenjang/pg/JoinSection";
import TestimonialsSection from "@/Components/jenjang/pg/TestimonialsSection";
import GallerySection from "@/Components/jenjang/pg/GallerySection";

export default function PgPage() {
  return (
    <AppLayout title="Play Group - SIT At-Taufiq">
      <Head title="Play Group - SIT At-Taufiq" />

      
        <JenjangDetailHero photoSrc="/images/jenjang/pg-hero.jpg" />
        <JenjangPillarsSection />
        <WhyChooseSection />
        <FacilitiesSection />
        <ActivitiesSection />
        <JoinSection />
        <TestimonialsSection />
        <GallerySection />
      
    </AppLayout>
  );
}