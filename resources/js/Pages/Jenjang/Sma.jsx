import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import JenjangDetailHero from "@/Components/jenjang/sma/JenjangDetailHero";
import JenjangPillarsSection from "@/Components/jenjang/sma/JenjangPillarsSection";
import WhyChooseSection from "@/Components/jenjang/sma/WhyChooseSection";
import FacilitiesSection from "@/Components/jenjang/sma/FacilitiesSection";
import ActivitiesSection from "@/Components/jenjang/sma/ActivitiesSection";
import JoinSection from "@/Components/jenjang/sma/JoinSection";
import TestimonialsSection from "@/Components/jenjang/sma/TestimonialsSection";
import GallerySection from "@/Components/jenjang/sma/GallerySection";

export default function SmaPage() {
  return (
    <AppLayout title="SMA - SIT At-Taufiq">
      <Head title="SMA - SIT At-Taufiq" />

      
        <JenjangDetailHero photoSrc="/images/jenjang/sma-hero.jpg" />
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