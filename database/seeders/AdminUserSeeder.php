<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $email = env('DEFAULT_ADMIN_EMAIL', 'admin@sekolah.sch.id');
        $name = env('DEFAULT_ADMIN_NAME', 'Super Admin');
        $password = env('DEFAULT_ADMIN_PASSWORD', 'AdminSecure2026!');

        User::firstOrCreate(
            ['email' => $email],
            [
                'name'              => $name,
                'password'          => Hash::make($password),
                'email_verified_at' => now(),
            ]
        );
    }
}

