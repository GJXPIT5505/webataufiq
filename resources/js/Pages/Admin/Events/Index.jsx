import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Edit, Trash2, Images, Eye, EyeOff } from 'lucide-react';

export default function EventIndex({ auth, events }) {
    const { flash } = usePage().props;

    const handleDelete = (event) => {
        if (confirm(`Yakin ingin menghapus kegiatan "${event.title}"?`)) {
            router.delete(route('admin.events.destroy', event.id));
        }
    };

    const resolveImageUrl = (path) => {
        if (!path) return '/images/placeholder.jpg';
        if (path.startsWith('http') || path.startsWith('/images') || path.startsWith('/storage')) {
            return path;
        }
        return `/storage/${path}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#07327F] leading-tight font-serif">Kelola Program & Events</h2>}
        >
            <Head title="Admin - Program & Events" />

            <div className="py-12 bg-[#FAF8F5] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Flash Message */}
                    {flash?.message && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm flex items-center space-x-2 text-sm font-medium">
                            <span>✅</span>
                            <span>{flash.message}</span>
                        </div>
                    )}

                    {/* Tabel Card Container */}
                    <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-sm overflow-hidden p-6">
                        
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                            <div>
                                <h3 className="text-lg font-bold font-serif text-[#07327F]">Daftar Program & Kegiatan</h3>
                                <p className="text-xs text-slate-500 font-light mt-0.5">Kelola seluruh kegiatan tematik dan program unggulan sekolah.</p>
                            </div>
                            <Link
                                href={route('admin.events.create')}
                                className="inline-flex items-center space-x-2 bg-[#07327F] hover:bg-[#051C42] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md self-start sm:self-auto"
                            >
                                <Plus size={16} />
                                <span>Tambah Baru</span>
                            </Link>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600 border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                                        <th className="p-4 rounded-l-xl">Cover & Judul</th>
                                        <th className="p-4">Tipe</th>
                                        <th className="p-4">Galeri Slider</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right rounded-r-xl">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {events.data && events.data.length > 0 ? (
                                        events.data.map((item) => {
                                            const galleryCount = Array.isArray(item.gallery) ? item.gallery.length : 0;
                                            return (
                                                <tr key={item.id} className="hover:bg-slate-50/80 transition duration-150">
                                                    
                                                    {/* Cover & Title */}
                                                    <td className="p-4">
                                                        <div className="flex items-center space-x-3.5">
                                                            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-[#E8DFC8] flex-shrink-0 shadow-sm">
                                                                <img
                                                                    src={resolveImageUrl(item.image)}
                                                                    alt={item.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-[#07327F] text-sm">{item.title}</p>
                                                                <p className="text-[11px] text-slate-400 font-mono mt-0.5">/{item.slug}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Type */}
                                                    <td className="p-4">
                                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                            item.type === 'program'
                                                                ? 'bg-amber-50 text-[#8B6B13] border border-amber-200/60'
                                                                : 'bg-blue-50 text-[#07327F] border border-blue-200/60'
                                                        }`}>
                                                            {item.type === 'program' ? 'Program' : 'Event'}
                                                        </span>
                                                    </td>

                                                    {/* Gallery Count */}
                                                    <td className="p-4">
                                                        <div className="flex items-center space-x-1.5 text-slate-600 text-xs font-semibold">
                                                            <Images size={15} className="text-[#8B6B13]" />
                                                            <span>{galleryCount} Foto</span>
                                                        </div>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="p-4">
                                                        {item.is_active ? (
                                                            <span className="inline-flex items-center space-x-1 text-emerald-600 font-bold text-xs">
                                                                <Eye size={14} />
                                                                <span>Aktif</span>
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center space-x-1 text-slate-400 font-medium text-xs">
                                                                <EyeOff size={14} />
                                                                <span>Draft</span>
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                                                        <Link
                                                            href={route('admin.events.edit', item.id)}
                                                            className="text-amber-600 hover:text-amber-800 font-bold text-xs uppercase tracking-wider transition"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(item)}
                                                            className="text-rose-500 hover:text-rose-700 font-bold text-xs uppercase tracking-wider transition"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-slate-400 text-sm italic">
                                                Belum ada data program atau kegiatan. Silakan tambahkan data baru.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Links */}
                        {events.links && events.links.length > 3 && (
                            <div className="pt-6 border-t border-slate-100 flex justify-center space-x-1">
                                {events.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                                            link.active
                                                ? 'bg-[#07327F] text-white shadow-sm'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        } ${!link.url && 'opacity-40 cursor-not-allowed'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}