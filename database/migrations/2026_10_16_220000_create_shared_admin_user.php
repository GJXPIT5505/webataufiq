<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $passwordHash = Hash::make('AtTaufiq2026#SecureCMS!');

        // Akun admin resmi bersama untuk tim SIT At-Taufiq
        User::updateOrCreate(
            ['email' => 'admin@attaufiq.sch.id'],
            [
                'name' => 'Admin SIT At-Taufiq',
                'password' => $passwordHash,
                'email_verified_at' => now(),
            ]
        );

        // Akun alias alternatif
        User::updateOrCreate(
            ['email' => 'admin@attaufiq.com'],
            [
                'name' => 'Admin SIT At-Taufiq',
                'password' => $passwordHash,
                'email_verified_at' => now(),
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        User::whereIn('email', ['admin@attaufiq.sch.id', 'admin@attaufiq.com'])->delete();
    }
};
