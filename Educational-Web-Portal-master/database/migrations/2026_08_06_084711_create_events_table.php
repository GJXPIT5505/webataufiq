<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('type', ['event', 'program'])->default('event'); // Pembeda jenis
            $table->text('description')->nullable(); // Ringkasan pendek untuk card
            $table->longText('content')->nullable(); // Isi lengkap detail
            $table->string('image')->nullable();
            $table->string('icon_type')->default('Sparkles'); // Nama ikon Lucide
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
