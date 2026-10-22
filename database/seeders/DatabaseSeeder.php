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
        // 1. Buat Akun Admin Bersama SIT At-Taufiq
        User::updateOrCreate(
            ['email' => 'admin@attaufiq.sch.id'],
            [
                'name' => 'Admin SIT At-Taufiq',
                'password' => bcrypt('AtTaufiq2026#SecureCMS!'),
                'email_verified_at' => now(),
            ]
        );

        // 2. PANGGIL SEEDER LAINNYA DI SINI! (WAJIB)
        $this->call([
            PostSeeder::class,
            GallerySeeder::class,
        ]);
    }
}