import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, galleries }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-black text-xl text-[#003366] uppercase tracking-tighter">Gallery Management</h2>}>
            <Head title="Manage Gallery" />

            <div className="flex justify-end mb-8">
                <Link href={route('admin.gallery.create')} className="bg-[#FF6600] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-900/20 hover:scale-105 transition">
                    + Upload Foto Baru
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {galleries.map((item) => (
                    <div key={item.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 group relative">
                        <img src={`/storage/${item.image}`} className="w-full aspect-square object-cover" />
                        <div className="absolute inset-0 bg-[#003366]/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-center items-center p-6 text-center">
                            <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                            <p className="text-[#FF6600] text-[10px] font-black uppercase mb-4 tracking-widest">{item.category}</p>
                            
                            {/* --- TOMBOL AKSI (Edit & Hapus) --- */}
                            <div className="flex space-x-2">
                                <Link 
                                    href={route('admin.gallery.edit', item.id)}
                                    className="text-white bg-blue-500/20 hover:bg-blue-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase transition"
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => confirm('Hapus foto ini?') && router.delete(route('admin.gallery.destroy', item.id))}
                                    className="text-white bg-red-500/20 hover:bg-red-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase transition"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}