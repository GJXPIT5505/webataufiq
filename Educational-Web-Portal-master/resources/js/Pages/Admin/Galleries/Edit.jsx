import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, gallery }) {
    // Isi default value dari props gallery
    const { data, setData, post, processing, errors } = useForm({
        title: gallery.title,
        category: gallery.category,
        image: null, // Kosongkan, hanya diisi jika user ingin ganti foto
        _method: 'PUT', // WAJIB untuk Update di Laravel/Inertia yang ada file upload
    });

    const submit = (e) => {
        e.preventDefault();
        // Gunakan method POST tapi dengan _method: 'PUT' di data agar Laravel mengenali as Update
        post(route('admin.gallery.update', gallery.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-xl text-[#003366] uppercase tracking-tighter text-center">Edit Galeri At-Taufiq</h2>}
        >
            <Head title="Edit Gallery" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href={route('admin.gallery.index')} className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-[#FF6600] transition">
                        ← Kembali ke Galeri
                    </Link>
                </div>

                <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100">
                    <form onSubmit={submit} className="grid md:grid-cols-2 gap-10">
                        
                        {/* Kolom Kiri: Input */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4 mb-2 block">Judul Dokumentasi</label>
                                <input 
                                    type="text" 
                                    className="w-full border-none bg-slate-50 rounded-2xl p-4 focus:ring-2 focus:ring-[#FF6600]"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-[10px] mt-2 ml-4 font-bold uppercase">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4 mb-2 block">Kategori Unit</label>
                                <select 
                                    className="w-full border-none bg-slate-50 rounded-2xl p-4 focus:ring-2 focus:ring-[#FF6600]"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                >
                                    <option value="Umum">Umum / Semua</option>
                                    <option value="TK">TK Robbani</option>
                                    <option value="SD">SD IT At-Taufiq</option>
                                    <option value="SMP">SMP IT At-Taufiq</option>
                                </select>
                            </div>

                            <div className="pt-6">
                                <button disabled={processing} className="w-full bg-[#FF6600] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#003366] transition">
                                    {processing ? 'Memperbarui...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </div>

                        {/* Kolom Kanan: Preview & Upload */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[40px] p-8 bg-slate-50/50">
                            <label className="cursor-pointer text-center group">
                                <div className="mb-4 text-4xl group-hover:scale-110 transition">📸</div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] block mb-4">Ganti Foto (Opsional)</span>
                                <input type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                            </label>

                            {/* Tampilan Gambar Sekarang atau Preview Baru */}
                            <div className="mt-4 text-center">
                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Foto Saat Ini / Preview:</p>
                                <div className="w-48 h-48 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                                    <img 
                                        src={data.image ? URL.createObjectURL(data.image) : `/storage/${gallery.image}`} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}