import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, categories = [] }) {
    // Inisialisasi useForm dengan category_id
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: categories.length > 0 ? categories[0].id : '', // Auto select kategori pertama jika ada
        content: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send multipart form via post
        post(route('admin.posts.store'));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-[#07327F] leading-tight font-serif">Tambah Berita At-Taufiq</h2>}
        >
            <Head title="Admin - Tambah Berita" />

            <div className="py-12 bg-[#FAF8F5] min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 shadow-sm rounded-3xl border border-[#E8DFC8]">
                        
                        <div className="mb-6 pb-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold font-serif text-[#07327F]">Buat Artikel Berita Baru</h3>
                            <p className="text-xs text-slate-500 mt-1 font-light">
                                Lengkapi formulir di bawah ini untuk menerbitkan berita atau pengumuman kegiatan sekolah.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Judul Berita */}
                            <div>
                                <label className="block text-xs font-bold text-[#07327F] mb-2 uppercase tracking-wider">
                                    Judul Berita <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Masukkan judul artikel berita..."
                                    className="w-full border-slate-300 rounded-xl focus:ring-[#07327F] focus:border-[#07327F] text-sm py-2.5 px-4"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-rose-500 text-xs mt-1.5">{errors.title}</div>}
                            </div>

                            {/* Dropdown Kategori (NEW) */}
                            <div>
                                <label className="block text-xs font-bold text-[#07327F] mb-2 uppercase tracking-wider">
                                    Kategori Artikel <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    className="w-full border-slate-300 rounded-xl focus:ring-[#07327F] focus:border-[#07327F] text-sm py-2.5 px-4 bg-white"
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                >
                                    <option value="" disabled>-- Pilih Kategori --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <div className="text-rose-500 text-xs mt-1.5">{errors.category_id}</div>}
                                {categories.length === 0 && (
                                    <p className="text-xs text-amber-600 mt-1">
                                        ⚠️ Belum ada kategori di database. Silakan buat kategori dulu di menu <Link href={route('admin.categories.index')} className="underline font-bold">Kategori</Link>.
                                    </p>
                                )}
                            </div>

                            {/* Isi Konten */}
                            <div>
                                <label className="block text-xs font-bold text-[#07327F] mb-2 uppercase tracking-wider">
                                    Isi Berita <span className="text-rose-500">*</span>
                                </label>
                                <textarea 
                                    rows="8"
                                    placeholder="Tuliskan isi artikel atau pengumuman secara lengkap di sini..."
                                    className="w-full border-slate-300 rounded-xl focus:ring-[#07327F] focus:border-[#07327F] text-sm p-4 leading-relaxed"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                ></textarea>
                                {errors.content && <div className="text-rose-500 text-xs mt-1.5">{errors.content}</div>}
                            </div>

                            {/* Upload Gambar */}
                            <div>
                                <label className="block text-xs font-bold text-[#07327F] mb-2 uppercase tracking-wider">
                                    Gambar Utama / Banner
                                </label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#07327F] hover:file:bg-blue-100 transition cursor-pointer"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                {errors.image && <div className="text-rose-500 text-xs mt-1.5">{errors.image}</div>}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end items-center space-x-3 pt-6 border-t border-slate-100">
                                <Link 
                                    href={route('admin.posts.index')} 
                                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-700 transition"
                                >
                                    Batal
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-[#07327F] hover:bg-[#051C42] text-white px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Terbitkan Berita'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}