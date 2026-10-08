<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'type',
        'description',
        'content',
        'image',
        'icon_type',
        'is_active',
        'gallery',
    ];
    protected $casts = [
        'gallery' => 'array',
    ];
}
