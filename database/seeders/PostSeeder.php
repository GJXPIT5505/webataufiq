<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Data Blog dummy - At-Taufiq Jambi
        Post::create([
            'title' => 'Opening Ceremony SIT At-Taufiq 2026',
            'slug' => Str::slug('Opening Ceremony SIT At-Taufiq 2026'),
            'content' => 'Selamat datang di tahun ajaran baru di SIT At-Taufiq Jambi. Mari kita mencetak generasi Robbani bersama!',
            'image' => 'posts/sample-blog.jpg', 
            'is_featured' => true,
        ]);

        Post::create([
            'title' => 'Kunjungan Edukasi Santri SD IT',
            'slug' => Str::slug('Kunjungan Edukasi Santri SD IT'),
            'content' => 'Para santri SD IT At-Taufiq melakukan kunjungan edukatif untuk mengenal alam lebih dekat.',
            'image' => 'posts/sample-blog-2.jpg', 
            'is_featured' => false,
        ]);
    }
}