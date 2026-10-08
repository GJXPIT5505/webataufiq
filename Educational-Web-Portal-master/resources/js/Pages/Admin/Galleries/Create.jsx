import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    // Inisialisasi Form Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: 'Umum',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // Inertia otomatis handle FormData kalau ada file (image)
        post(route('admin.gallery.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-xl text-[#003366] uppercase tracking-tighter">Upload Foto Baru</h2>}
        >
            <Head title="Upload Gallery - Admin At-Taufiq" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href={route('admin.gallery.index')} className="text-[#003366] font-bold text-xs uppercase tracking-widest hover:text-[#FF6600] transition">
                        ← Kembali ke List
                    </Link>
                </div>

                <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100">
                    <form onSubmit={submit} className="grid md:grid-cols-2 gap-10">
                        
                        {/* Kolom Kiri: Input Data */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4 mb-2 block">Judul Dokumentasi</label>
                                <input 
                                    type="text" 
                                    placeholder="Contoh: Lomba Mewarnai TK"
                                    className="w-full border-none bg-slate-50 rounded-2xl p-4 focus:ring-2 focus:ring-[#FF6600] transition"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-[10px] mt-2 ml-4 font-bold uppercase">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4 mb-2 block">Kategori Unit</label>
                                <select 
                                    className="w-full border-none bg-slate-50 rounded-2xl p-4 focus:ring-2 focus:ring-[#FF6600] transition appearance-none"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                >
                                    <option value="Umum">Umum / Semua</option>
                                    <option value="TK">TK Robbani</option>
                                    <option value="SD">SD IT At-Taufiq</option>
                                    <option value="SMP">SMP IT At-Taufiq</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-[10px] mt-2 ml-4 font-bold uppercase">{errors.category}</p>}
                            </div>

                            <div className="pt-6">
                                <button 
                                    disabled={processing}
                                    className="w-full bg-[#003366] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#FF6600] transition shadow-xl shadow-blue-900/10 disabled:opacity-50"
                                >
                                    {processing ? 'Sedang Memproses...' : 'Simpan ke Galeri'}
                                </button>
                            </div>
                        </div>

                        {/* Kolom Kanan: Upload Image */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[40px] p-8 bg-slate-50/50 group hover:border-[#FF6600] transition">
                            <label className="cursor-pointer text-center">
                                <div className="mb-4 text-4xl group-hover:scale-110 transition">🖼️</div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Pilih Foto (Max 2MB)</span>
                                <input 
                                    type="file" 
                                    className="hidden"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <div className="bg-white px-6 py-2 rounded-full shadow-sm text-[10px] font-black uppercase tracking-widest text-[#003366]">Pilih File</div>
                            </label>

                            {/* Preview Sederhana */}
                            {data.image && (
                                <div className="mt-6 text-center">
                                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">File Siap: {data.image.name}</p>
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md mx-auto">
                                        <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            )}
                            {errors.image && <p className="text-red-500 text-[10px] mt-4 font-bold uppercase text-center">{errors.image}</p>}
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}