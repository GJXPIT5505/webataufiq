import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import JenjangDetailHero from "@/Components/jenjang/tk/JenjangDetailHero";
import JenjangPillarsSection from "@/Components/jenjang/tk/JenjangPillarsSection";
import WhyChooseSection from "@/Components/jenjang/tk/WhyChooseSection";
import FacilitiesSection from "@/Components/jenjang/tk/FacilitiesSection";
import ActivitiesSection from "@/Components/jenjang/tk/ActivitiesSection";
import JoinSection from "@/Components/jenjang/tk/JoinSection";
import TestimonialsSection from "@/Components/jenjang/tk/TestimonialsSection";
import GallerySection from "@/Components/jenjang/tk/GallerySection";

export default function TkPage() {
  return (
    <AppLayout title="TK - SIT At-Taufiq">
      <Head title="TK - SIT At-Taufiq" />

      
        <JenjangDetailHero photoSrc="/images/jenjang/tk-hero.jpg" />
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