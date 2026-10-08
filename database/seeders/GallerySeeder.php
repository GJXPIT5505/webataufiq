<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gallery;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['TK', 'SD', 'SMP', 'Umum'];

        for ($i = 1; $i <= 6; $i++) {
            Gallery::create([
                'title' => "Dokumentasi Kegiatan At-Taufiq $i",
                'image' => "galleries/sample-gallery-$i.jpg",
                'category' => $categories[array_rand($categories)],
            ]);
        }
    }
}