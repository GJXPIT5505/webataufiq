<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery; // PASTIKAN PAKAI MODEL GALLERY
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    // Tampilan daftar foto (Ini yang bikin error tadi kalau ga ada)
    public function index()
    {
        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => Gallery::latest()->get()
        ]);
    }

    // Tampilan form upload
    public function create()
    {
        return Inertia::render('Admin/Galleries/Create');
    }

    // Proses Simpan
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:3000', // max 3MB
        ]);

        $path = $request->file('image')->store('galleries', 'public');

        Gallery::create([
            'title' => $request->title,
            'category' => $request->category,
            'image' => $path,
        ]);

        return redirect()->route('admin.gallery.index')->with('message', 'Foto At-Taufiq berhasil diupload!');
    }
    public function edit(Gallery $gallery)
{
    return Inertia::render('Admin/Galleries/Edit', [
        'gallery' => $gallery
    ]);
}

public function update(Request $request, Gallery $gallery)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'category' => 'required',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:3000',
    ]);

    // Update data teks
    $gallery->title = $request->title;
    $gallery->category = $request->category;

    // Logika ganti gambar (Hanya jika ada file baru di-upload)
    if ($request->hasFile('image')) {
        // Hapus gambar lama dari storage
        if ($gallery->image) {
            Storage::disk('public')->delete($gallery->image);
        }
        // Simpan gambar baru
        $gallery->image = $request->file('image')->store('galleries', 'public');
    }

    $gallery->save();

    return redirect()->route('admin.gallery.index')->with('message', 'Foto galeri berhasil diperbarui!');
}

// Proses Hapus
public function destroy(Gallery $gallery)
{
    if ($gallery->image) {
        Storage::disk('public')->delete($gallery->image);
    }

    $gallery->delete();

    return redirect()->back()->with('message', 'Foto berhasil dihapus!');
    }
}