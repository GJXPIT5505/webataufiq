<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Post::with('category')->latest()->get()
        ]);
    }
   
    public function create()
    {
        return Inertia::render('Admin/Posts/Create', [
            'categories' => Category::select('id', 'name', 'icon')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content'     => 'required',
            'image'       => 'nullable|image|mimes:jpg,JPEG,jpeg,png,webp|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        Post::create([
            'title'       => $request->input('title'),
            'slug'        => Str::slug($request->input('title')),
            'category_id' => $request->input('category_id'),
            'content'     => $request->input('content'),
            'image'       => $imagePath,
         
            'is_featured' => $request->boolean('is_featured', false),
        ]);

        return redirect()->route('admin.posts.index')->with('message', 'Berita SIT At-Taufiq berhasil diterbitkan!');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post'       => $post->load('category'),
            'categories' => Category::select('id', 'name', 'icon')->get()
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content'     => 'required',
            'image'       => 'nullable|image|mimes:jpg,JPEG,jpeg,png,webp|max:2048',
        ]);

        $post->title       = $request->input('title');
        $post->slug        = Str::slug($request->input('title'));
        $post->category_id = $request->input('category_id');
        $post->content     = $request->input('content');

        if ($request->hasFile('image')) {
            if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
            }
            $post->image = $request->file('image')->store('posts', 'public');
        }

        $post->save();

        return redirect()->route('admin.posts.index')->with('message', 'Berita berhasil diperbarui!');
    }
       
    public function destroy(Post $post)
    {
        if ($post->image && Storage::disk('public')->exists($post->image)) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->route('admin.posts.index')->with('message', 'Berita berhasil dihapus!');
    }
}