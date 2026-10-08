<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEventRequest;
use App\Http\Requests\Admin\UpdateEventRequest;
use App\Models\Event;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    // List Data
    public function index()
    {
        $events = Event::latest()->paginate(10);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    // Form Tambah
    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }

    // Simpan Data Baru
    public function store(StoreEventRequest $request)
    {
        $data = $request->validated();

        // 1. Simpan Cover Utama (Thumbnail)
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        // 2. Simpan Kumpulan Foto Gallery (Slider Pop-up)
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('events/gallery', 'public');
            }
            $data['gallery'] = $galleryPaths;
        }

        Event::create($data);

        return redirect()->route('admin.events.index')
            ->with('message', 'Kegiatan/Program berhasil ditambahkan!');
    }

    // Form Edit
    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,
        ]);
    }

    // Update Data
    public function update(UpdateEventRequest $request, Event $event)
    {
        $data = $request->validated();

        // 1. Update Cover Utama
        if ($request->hasFile('image')) {
            if ($event->image && Storage::disk('public')->exists($event->image)) {
                Storage::disk('public')->delete($event->image);
            }
            $data['image'] = $request->file('image')->store('events', 'public');
        }

        // 2. Update / Tambah Foto Gallery
        if ($request->hasFile('gallery')) {
            // Hapus file-file gallery lama di storage jika ada upload baru
            if (!empty($event->gallery)) {
                foreach ($event->gallery as $oldImg) {
                    if (Storage::disk('public')->exists($oldImg)) {
                        Storage::disk('public')->delete($oldImg);
                    }
                }
            }

            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('events/gallery', 'public');
            }
            $data['gallery'] = $galleryPaths;
        }

        $event->update($data);

        return redirect()->route('admin.events.index')
            ->with('message', 'Kegiatan/Program berhasil diperbarui!');
    }

    // Hapus Data Beserta Seluruh Fotonya
    public function destroy(Event $event)
    {
        // 1. Hapus Cover
        if ($event->image && Storage::disk('public')->exists($event->image)) {
            Storage::disk('public')->delete($event->image);
        }

        // 2. Hapus Semua Foto Gallery di Storage
        if (!empty($event->gallery)) {
            foreach ($event->gallery as $img) {
                if (Storage::disk('public')->exists($img)) {
                    Storage::disk('public')->delete($img);
                }
            }
        }

        $event->delete();

        return redirect()->route('admin.events.index')
            ->with('message', 'Kegiatan/Program berhasil dihapus!');
    }
}