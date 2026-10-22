<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    /**
     * Mass Assignment: Field mana saja yang boleh diisi lewat Form.
     */
    protected $fillable = [
    
        'title',       // Judul artikel atau Nama foto
        'slug',        // URL unik (penting buat SEO/Blog)
        'category_id',
        'content',     // Isi berita atau caption
        'image',       // Path file gambar di storage
        'is_featured', // Untuk menandai konten utama/headline
        'order',       // Untuk mengatur urutan foto di galeri/slider
    ];
    public function  category (){
        return $this ->belongsTo(Category::class);
    }
    /**
     * Format otomatis tipe data untuk field tertentu.
     */
    protected $casts = [
        'is_featured'  => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Boot Function: Logic otomatis saat data dibuat.
     * Kita buat slug otomatis dari title saat menyimpan 'blog'.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if ($post->type === 'blog' && empty($post->slug)) {
                $post->slug = \Illuminate\Support\Str::slug($post->title) . '-' . rand(1000, 9999);
            }
        });
    }

    /**
     * Scope: Helper untuk mempermudah query di Controller.
     * Jadi nanti di Controller cukup: Post::blogs()->get();
     */
    public function scopeBlogs($query)
    {
        return $query->where('type', 'blog')->latest();
    }

    public function scopeGalleries($query)
    {
        return $query->where('type', 'gallery')->orderBy('order', 'asc');
    }

    /**
     * Accessor: Mempercantik URL gambar.
     * Agar di React kamu tinggal panggil {post.image_url}
     */
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image 
            ? asset('storage/' . $this->image) 
            : asset('images/default-placeholder.jpg');
    }
}
