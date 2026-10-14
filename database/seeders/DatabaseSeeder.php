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
        // Panggil Seeder untuk Akun Admin dan Data Awal
        $this->call([
            AdminUserSeeder::class,
            PostSeeder::class,
            GallerySeeder::class,
        ]);
    }
}