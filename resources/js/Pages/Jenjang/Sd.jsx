import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import JenjangDetailHero from "@/Components/jenjang/sd/JenjangDetailHero";
import JenjangPillarsSection from "@/Components/jenjang/sd/JenjangPillarsSection";
import WhyChooseSection from "@/Components/jenjang/sd/WhyChooseSection";
import FacilitiesSection from "@/Components/jenjang/sd/FacilitiesSection";
import ActivitiesSection from "@/Components/jenjang/sd/ActivitiesSection";
import JoinSection from "@/Components/jenjang/sd/JoinSection";
import TestimonialsSection from "@/Components/jenjang/sd/TestimonialsSection";
import GallerySection from "@/Components/jenjang/sd/GallerySection";

export default function SdPage() {
  return (
    <AppLayout title="SD - SIT At-Taufiq">
      <Head title="SD - SIT At-Taufiq" />

      
        <JenjangDetailHero photoSrc="/images/jenjang/sd-hero.jpg" />
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