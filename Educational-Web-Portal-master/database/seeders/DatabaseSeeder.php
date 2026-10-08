<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Buat Akun Admin Kamu (Biar gak ribet register lagi)
        User::factory()->create([
            'name' => 'Muhammad Firman Azhary',
            'email' => 'admin@attaufiq.com',
            'password' => bcrypt('password'), // Password-nya: password
        ]);

        // 2. PANGGIL SEEDER LAINNYA DI SINI! (WAJIB)
        $this->call([
            PostSeeder::class,
            GallerySeeder::class,
        ]);
    }
}