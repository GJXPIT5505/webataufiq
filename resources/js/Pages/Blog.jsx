import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import PageHeroBanner from "@/Components/PageHeroBanner";
import BlogGridSection from "@/Components/blog/BlogGridSection";

export default function BlogIndex({ posts = [], categories = [] }) {
  return (
    <AppLayout title="Blog & Kabar - SIT At-Taufiq Jambi">
      <Head title="Blog | SIT At-Taufiq Jambi" />

      <PageHeroBanner
        heading="Blog"
        subheading={["Kabar, cerita, dan tips seputar", "kehidupan di Attaufiq."]}
        photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
      />

      <BlogGridSection posts={posts} categories={categories} />
    </AppLayout>
  );
}