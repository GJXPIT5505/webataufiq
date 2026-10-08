<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Gallery;
use App\Models\Category;
use App\Models\Event;
use Inertia\Inertia;

class PublicController extends Controller
{
    // ==========================================
    // 1. HALAMAN DINAMIS & BLOG
    // ==========================================

    public function index()
    {
        return Inertia::render('Welcome', [
            'posts'      => Post::with('category')->latest()->take(6)->get(),
            'galleries'  => Gallery::latest()->take(6)->get(),
            'categories' => Category::all(),
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('category')->where('slug', $slug)->firstOrFail();

        $relatedPosts = Post::with('category')
            ->where('id', '!=', $post->id)
            ->when($post->category_id, function ($query) use ($post) {
                return $query->where('category_id', $post->category_id);
            })
            ->latest()
            ->take(3)
            ->get();

        $prevPost = Post::where('id', '<', $post->id)->orderBy('id', 'desc')->first();
        $nextPost = Post::where('id', '>', $post->id)->orderBy('id', 'asc')->first();

        return Inertia::render('BlogDetail', [
            'post'         => $post,
            'relatedPosts' => $relatedPosts,
            'prevPost'     => $prevPost,
            'nextPost'     => $nextPost,
        ]);
    }

    public function blog()
    {
        return Inertia::render('Blog', [
            'posts' => Post::with('category')->latest()->get(),
            'categories' => Category::select('id', 'name', 'slug', 'icon')
                ->withCount('posts')
                ->get(),
        ]);
    }

    // ==========================================
    // 2. HALAMAN STATIS / TENTANG KAMI
    // ==========================================

    public function about()
    {
        return Inertia::render('About');
    }

    public function sejarah()
    {
        return Inertia::render('Sejarah');
    }

    public function faq()
    {
        return Inertia::render('Faq');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function admission()
    {
        return Inertia::render('Admission');
    }

    // ==========================================
    // 3. HALAMAN JENJANG PENDIDIKAN
    // ==========================================

    public function jenjang()
    {
        return Inertia::render('Jenjang/Jenjang');
    }

    public function pg()
    {
        return Inertia::render('Jenjang/Pg');
    }

    public function tk()
    {
        return Inertia::render('Jenjang/Tk');
    }

    public function sd()
    {
        return Inertia::render('Jenjang/Sd');
    }

    public function smp()
    {
        return Inertia::render('Jenjang/Smp');
    }

    public function sma()
    {
        return Inertia::render('Jenjang/Sma');
    }

    // ==========================================
    // 4. EVENTS & PROGRAMS
    // ==========================================

    public function events()
    {
        $events = Event::where('is_active', true)
            ->where('type', 'event')
            ->latest()
            ->get();

        return Inertia::render('Event', [
            'events'   => $events,
            'pageType' => 'event',
        ]);
    }

    public function programs()
    {
        $programs = Event::where('is_active', true)
            ->where('type', 'program')
            ->latest()
            ->get();

        return Inertia::render('Program', [
            'events'   => $programs,
            'pageType' => 'program',
        ]);
    }

    public function eventShow($slug)
    {
        $event = Event::where('slug', $slug)->where('is_active', true)->firstOrFail();

        $relatedEvents = Event::where('id', '!=', $event->id)
            ->where('type', $event->type)
            ->where('is_active', true)
            ->take(3)
            ->get();

        return Inertia::render('EventDetail', [
            'event'         => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }
}