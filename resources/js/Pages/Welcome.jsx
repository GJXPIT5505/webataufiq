import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';
import CharacterActivitySection from '@/Components/home/CharacterActivitySection';
import JourneySection from '@/Components/home/journey/JourneySection';
import ExcellenceSection from '@/Components/home/excellence/ExcellenceSection';
import AchievementsSection from '@/Components/home/achievements/AchievementsSection';
import ClosingCtaSection from '@/Components/home/closing/ClosingCtaSection';
import TestimonialSection from '@/Components/home/testimonials/TestimonialSection';
import BlogPreview from '@/Components/home/BlogPreview';
import { dummyBlogPosts } from '@/data/blog';

export default function Welcome({ auth, posts = [], galleries = [], categories = [] }) {
    const hasPosts = Array.isArray(posts)
        ? posts.length > 0
        : Boolean(posts?.data && posts.data.length > 0);

    const effectivePosts = hasPosts
        ? (Array.isArray(posts) ? posts : posts.data)
        : dummyBlogPosts;

    return (
        <AppLayout title="Home">
            <Head title="SIT At-Taufiq Jambi - Mencetak Generasi Robbani" />

            {/* 1. Hero Section */}
            <HeroSlider />

            {/* 2. Character & Activity Section */}
            <CharacterActivitySection />

            {/* 3. Journey Section */}
            <JourneySection />

            {/* 4. Keunggulan / Excellence Section */}
            <ExcellenceSection />

            {/* 5. Prestasi / Achievements Section */}
            <AchievementsSection />

            {/* 6. Closing CTA Section */}
            <ClosingCtaSection />

            {/* 7. Testimonial Section */}
            <TestimonialSection />

            {/* 8. Blog Section */}
            <BlogPreview posts={effectivePosts} />
        </AppLayout>
    );
}
