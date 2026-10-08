import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Save, Images, X, Image as ImageIcon } from 'lucide-react';

export default function EventEdit({ auth, event }) {
    const { data, setData, processing, errors } = useForm({
        _method: 'PUT',
        title: event.title || '',
        slug: event.slug || '',
        type: event.type || 'program',
        description: event.description || '',
        content: event.content || '',
        icon_type: event.icon_type || 'Sparkles',
        image: null,
        gallery: [],
        is_active: Boolean(event.is_active),
    });

    const resolveImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http') || path.startsWith('/images') || path.startsWith('/storage')) {
            return path;
        }
        return `/storage/${path}`;
    };

    const [coverPreview, setCoverPreview] = useState(resolveImageUrl(event.image));
    const [existingGallery, setExistingGallery] = useState(
        Array.isArray(event.gallery) ? event.gallery.map(resolveImageUrl) : []
    );
    const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleNewGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newFiles = [...data.gallery, ...files];
            setData('gallery', newFiles);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setNewGalleryPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeNewGalleryItem = (index) => {
        const updatedFiles = data.gallery.filter((_, i) => i !== index);
        const updatedPreviews = newGalleryPreviews.filter((_, i) => i !== index);
        setData('gallery', updatedFiles);
        setNewGalleryPreviews(updatedPreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.events.update', event.id), {
            _method: 'PUT',
            ...data,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#07327F] leading-tight font-serif">Edit: {event.title}</h2>}
        >
            <Head title={`Admin - Edit ${event.title}`} />

            <div className="py-12 bg-[#FAF8F5] min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Back Link */}
                    <Link
                        href={route('admin.events.index')}
                        className="inline-flex items-center space-x-2 text-xs font-bold text-[#07327F] hover:text-[#051C42] transition uppercase tracking-wider"
                    >
                        <ArrowLeft size={16} />
                        <span>Kembali ke Daftar</span>
                    </Link>

                    <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-sm">
                        <div className="mb-6 border-b border-slate-100 pb-4">
                            <h3 className="text-lg font-bold font-serif text-[#07327F]">Form Edit Program / Event</h3>
                            <p className="text-xs text-slate-500 font-light">Perbarui rincian, cover kartu, atau kumpulan slide galeri kegiatan.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 text-sm text-slate-700">
                            
                            {/* Judul & Slug */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">Judul Program / Event *</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-[#07327F] focus:border-[#07327F] transition"
                                    />
                                    {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">Slug (URL) *</label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-300 bg-slate-50 rounded-xl text-sm focus:ring-[#07327F] focus:border-[#07327F] transition"
                                    />
                                    {errors.slug && <p className="text-rose-500 text-xs mt-1">{errors.slug}</p>}
                                </div>
                            </div>

                            {/* Tipe & Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">Tipe *</label>
                                    <select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-[#07327F] focus:border-[#07327F] transition"
                                    >
                                        <option value="program">Program Unggulan</option>
                                        <option value="event">Event / Kegiatan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">Status Publikasi</label>
                                    <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="rounded border-slate-300 text-[#07327F] focus:ring-[#07327F]"
                                        />
                                        <span className="font-semibold text-slate-700 text-xs">Tampilkan di Website (Aktif)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Cover Utama */}
                            <div className="bg-[#FAF8F5] border border-[#E8DFC8] rounded-2xl p-4 space-y-3">
                                <div>
                                    <label className="block font-bold text-[#07327F] text-xs uppercase tracking-wider flex items-center space-x-1.5">
                                        <ImageIcon size={15} className="text-[#8B6B13]" />
                                        <span>Gambar Cover Utama (Thumbnail Kartu Depan)</span>
                                    </label>
                                    <p className="text-[11px] text-slate-500 font-light">Pilih file baru jika ingin mengganti cover yang lama.</p>
                                </div>

                                <div className="flex items-center space-x-4 pt-1">
                                    {coverPreview && (
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#E8DFC8] flex-shrink-0 shadow-sm">
                                            <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverChange}
                                        className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white file:text-[#07327F] file:border file:border-slate-200 hover:file:bg-slate-100 transition"
                                    />
                                </div>
                                {errors.image && <p className="text-rose-500 text-xs mt-1">{errors.image}</p>}
                            </div>

                            {/* Multi-Photo Gallery */}
                            <div className="bg-[#FAF8F5] border border-[#E8DFC8] rounded-2xl p-4 space-y-4">
                                <div>
                                    <label className="block font-bold text-[#07327F] text-xs uppercase tracking-wider flex items-center space-x-1.5">
                                        <Images size={15} className="text-[#8B6B13]" />
                                        <span>Foto Galeri Slider Pop-up</span>
                                    </label>
                                    <p className="text-[11px] text-slate-500 font-light">Dokumentasi foto kegiatan yang dapat di-slide di modal pop-up.</p>
                                </div>

                                {existingGallery.length > 0 && (
                                    <div>
                                        <p className="font-bold text-[#07327F] text-[11px] mb-2 uppercase tracking-wider">Foto Tersimpan Saat Ini:</p>
                                        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3">
                                            {existingGallery.map((url, idx) => (
                                                <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-sm">
                                                    <img src={url} alt={`Saved ${idx + 1}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                                    <label className="block font-bold text-[#07327F] text-xs uppercase tracking-wider">Upload Galeri Tambahan / Baru:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleNewGalleryChange}
                                        className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white file:text-[#07327F] file:border file:border-slate-200 hover:file:bg-slate-100 transition"
                                    />

                                    {newGalleryPreviews.length > 0 && (
                                        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 pt-2">
                                            {newGalleryPreviews.map((previewUrl, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-sm group">
                                                    <img src={previewUrl} alt={`New Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeNewGalleryItem(idx)}
                                                        className="absolute top-1 right-1 bg-rose-500/80 hover:bg-rose-600 text-white rounded-full p-1 transition opacity-0 group-hover:opacity-100"
                                                        title="Hapus foto"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {errors.gallery && <p className="text-rose-500 text-xs mt-1">{errors.gallery}</p>}
                            </div>

                            {/* Ringkasan */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">Deskripsi Singkat</label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-[#07327F] focus:border-[#07327F] transition"
                                ></textarea>
                                {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            {/* Konten Lengkap */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">Konten Lengkap</label>
                                <textarea
                                    rows="6"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-[#07327F] focus:border-[#07327F] transition"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center space-x-2 bg-[#07327F] hover:bg-[#051C42] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-50"
                                >
                                    <Save size={16} />
                                    <span>Perbarui Data</span>
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}