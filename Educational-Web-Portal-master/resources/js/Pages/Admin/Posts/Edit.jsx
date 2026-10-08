import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, post, categories = [] }) {
    // Inisialisasi form dengan data eksisting dari post
    const { data, setData, post: submitForm, processing, errors } = useForm({
        _method: 'PUT', // Trik Inertia agar request multipart/form-data bisa dibaca sebagai PUT di Laravel
        title: post.title || '',
        category_id: post.category_id || (categories.length > 0 ? categories[0].id : ''),
        content: post.content || '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mengirimkan request POST ke route update dengan parameter _method: 'PUT'
        submitForm(route('admin.posts.update', post.id));
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-[#07327F] leading-tight font-serif">Edit Berita At-Taufiq</h2>}
        >
            <Head title="Admin - Edit Berita" />

            <div className="py-12 bg-[#FAF8F5] min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 shadow-sm rounded-3xl border border-[#E8DFC8]">
                        
                        <div className="mb-6 pb-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold font-serif text-[#07327F]">Edit Artikel Berita</h3>
                            <p className="text-xs text-slate-500 mt-1 font-light">
                                Perbarui informasi artikel berita atau pengumuman di bawah ini.
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

                            {/* Dropdown Kategori */}
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

                            {/* Upload & Preview Gambar */}
                            <div>
                                <label className="block text-xs font-bold text-[#07327F] mb-2 uppercase tracking-wider">
                                    Gambar Utama / Banner
                                </label>

                                {/* Preview Gambar Lama jika ada */}
                                {post.image && (
                                    <div className="mb-3 flex items-center space-x-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 w-fit">
                                        <img 
                                            src={`/storage/${post.image}`} 
                                            alt="Current Thumbnail" 
                                            className="w-20 h-14 object-cover rounded-xl shadow-sm"
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-slate-700">Gambar Saat Ini</p>
                                            <p className="text-[10px] text-slate-400">Pilih file baru di bawah jika ingin mengganti gambar.</p>
                                        </div>
                                    </div>
                                )}

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
                                    {processing ? 'Menyimpan...' : 'Perbarui Berita'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}