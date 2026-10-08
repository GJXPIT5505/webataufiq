<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EventController;


Route::get('/', [PublicController::class, 'index']);
Route::get('/about', [PublicController::class, 'about'])->name('about');
Route::get('/jenjang', [PublicController::class, 'jenjang'])->name('jenjang');
Route::get('/pg', [PublicController::class, 'pg'])->name('pg');
Route::get('/tk', [PublicController::class, 'tk'])->name('tk');
Route::get('/sd', [PublicController::class, 'sd'])->name('sd');
Route::get('/smp', [PublicController::class, 'smp'])->name('smp');
Route::get('/sma', [PublicController::class, 'sma'])->name('sma');
Route::get('/sejarah', [PublicController::class, 'sejarah'])->name('sejarah');
Route::get('/faq', [PublicController::class, 'faq'])->name('faq');
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
Route::get('/blog/{slug}', [PublicController::class, 'show'])->name('blog.show');
Route::get('/blog', [PublicController::class, 'blog'])->name('blog');
Route::get('/events', [PublicController::class, 'events'])->name('events.index');
// Public Programs (Khusus Program Unggulan)
Route::get('/programs', [PublicController::class, 'programs'])->name('programs.index');
Route::get('/events/{slug}', [PublicController::class, 'eventShow'])->name('events.show');
Route::get('/admission', [PublicController::class, 'admission'])->name('admission');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Route untuk CRUD Post
    Route::resource('posts', PostController::class);
    Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);
    Route::resource('events', EventController::class);
    Route::resource('gallery', GalleryController::class);
});

require __DIR__.'/auth.php';
