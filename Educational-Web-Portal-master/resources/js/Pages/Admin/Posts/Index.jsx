import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ auth, posts }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#07327F] leading-tight font-serif">Kelola Berita At-Taufiq</h2>}
        >
            <Head title="Admin - Blog & Berita" />

            <div className="py-12 bg-[#FAF8F5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Flash Message Success */}
                    {flash.message && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm font-medium">
                                <span>✅</span>
                                <span>{flash.message}</span>
                            </div>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-[#E8DFC8] p-6 md:p-8">
                        
                        {/* Top Action Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div>
                                <h3 className="text-xl font-bold font-serif text-[#07327F]">Daftar Artikel & Berita</h3>
                                <p className="text-xs text-slate-500 mt-1 font-light">
                                    Kelola seluruh publikasi berita dan informasi kegiatan sekolah.
                                </p>
                            </div>
                            <Link 
                                href={route('admin.posts.create')} 
                                className="bg-[#07327F] hover:bg-[#051C42] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-md hover:shadow-lg flex items-center space-x-2"
                            >
                                <span>+</span>
                                <span>Tambah Berita</span>
                            </Link>
                        </div>

                        {/* Table Posts */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                                        <th className="p-4 rounded-l-xl">Gambar</th>
                                        <th className="p-4">Judul Artikel</th>
                                        <th className="p-4">Kategori</th>
                                        <th className="p-4">Tanggal</th>
                                        <th className="p-4 text-right rounded-r-xl">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {posts.length > 0 ? (
                                        posts.map((post) => (
                                            <tr key={post.id} className="hover:bg-slate-50/80 transition duration-150">
                                                {/* Thumbnail Image */}
                                                <td className="p-4">
                                                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                                                        <img 
                                                            src={post.image ? `/storage/${post.image}` : '/images/placeholder.jpg'} 
                                                            className="w-full h-full object-cover" 
                                                            alt={post.title} 
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                            }}
                                                        />
                                                    </div>
                                                </td>

                                                {/* Title */}
                                                <td className="p-4 font-bold text-[#07327F] max-w-xs md:max-w-md">
                                                    <div className="line-clamp-2 leading-snug">{post.title}</div>
                                                </td>

                                                {/* Kategori Badge */}
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#07327F] border border-blue-200/60">
                                                        {post.category ? post.category.name : 'Umum'}
                                                    </span>
                                                </td>

                                                {/* Date */}
                                                <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                                                    {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>

                                                {/* Actions */}
                                                <td className="p-4 text-right space-x-3 whitespace-nowrap">
                                                    <Link 
                                                        href={route('admin.posts.edit', post.id)} 
                                                        className="text-amber-600 hover:text-amber-800 font-bold text-xs uppercase tracking-wider transition"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => {
                                                            if (confirm('Yakin ingin menghapus berita At-Taufiq ini?')) {
                                                                router.delete(route('admin.posts.destroy', post.id));
                                                            }
                                                        }}
                                                        className="text-rose-500 hover:text-rose-700 font-bold text-xs uppercase tracking-wider transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-slate-400 text-sm italic">
                                                Belum ada berita yang diterbitkan. Silakan tambah berita baru.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}