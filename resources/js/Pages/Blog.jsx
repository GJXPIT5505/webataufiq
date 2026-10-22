import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import PageHeroBanner from "@/Components/PageHeroBanner";
import BlogGridSection from "@/Components/blog/BlogGridSection";
import { dummyBlogPosts, blogCategories } from "@/data/blog";

export default function BlogIndex({ posts = [], categories = [] }) {
  const hasPosts = Array.isArray(posts)
    ? posts.length > 0
    : Boolean(posts?.data && posts.data.length > 0);

  const effectivePosts = hasPosts
    ? (Array.isArray(posts) ? posts : posts.data)
    : dummyBlogPosts;

  const hasCategories = Array.isArray(categories) && categories.length > 0;
  const effectiveCategories = hasCategories ? categories : blogCategories;

  return (
    <AppLayout title="Blog & Kabar - SIT At-Taufiq Jambi">
      <Head title="Blog | SIT At-Taufiq Jambi" />

      <PageHeroBanner
        heading="Blog"
        subheading={["Kabar, cerita, dan tips seputar", "kehidupan di Attaufiq."]}
        photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
      />

      <BlogGridSection posts={effectivePosts} categories={effectiveCategories} />
    </AppLayout>
  );
}
