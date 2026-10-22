import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    FileText, 
    Calendar, 
    Image as ImageIcon, 
    FolderTree, 
    ExternalLink, 
    Sparkles, 
    PlusCircle,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';

export default function Dashboard() {
    const modules = [
        {
            title: 'Kelola Blog & Berita',
            desc: 'Tulis dan publikasikan berita sekolah, prestasi santri, serta artikel edukasi terbaru.',
            icon: FileText,
            color: 'from-blue-600 to-indigo-700',
            iconBg: 'bg-blue-50 text-blue-600',
            href: route('admin.posts.index'),
            createHref: route('admin.posts.create'),
            createLabel: 'Tulis Berita Baru',
            stats: 'Artikel & Berita'
        },
        {
            title: 'Agenda & Program Kegiatan',
            desc: 'Kelola jadwal acara, kegiatan santri, agenda tahunan, dan program unggulan SIT At-Taufiq.',
            icon: Calendar,
            color: 'from-amber-500 to-orange-600',
            iconBg: 'bg-amber-50 text-amber-600',
            href: route('admin.events.index'),
            createHref: route('admin.events.create'),
            createLabel: 'Tambah Agenda Baru',
            stats: 'Events & Agenda'
        },
        {
            title: 'Galeri Foto Kegiatan',
            desc: 'Upload dokumentasi foto kegiatan belajar mengajar, fasilitas sekolah, dan ekstrakurikuler.',
            icon: ImageIcon,
            color: 'from-emerald-500 to-teal-700',
            iconBg: 'bg-emerald-50 text-emerald-600',
            href: route('admin.gallery.index'),
            createHref: route('admin.gallery.create'),
            createLabel: 'Upload Foto Baru',
            stats: 'Foto Dokumentasi'
        },
        {
            title: 'Kategori Konten',
            desc: 'Atur kategori untuk mempermudah pengunjung menemukan informasi sesuai jenjang dan topik.',
            icon: FolderTree,
            color: 'from-purple-600 to-violet-700',
            iconBg: 'bg-purple-50 text-purple-600',
            href: route('admin.categories.index'),
            stats: 'Pengelompokan'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Pusat Kendali CMS
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Sistem Manajemen Konten Website Resmi SIT At-Taufiq Jambi
                        </p>
                    </div>
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    >
                        <span>Lihat Website</span>
                        <ExternalLink size={13} />
                    </a>
                </div>
            }
        >
            <Head title="Panel CMS - SIT At-Taufiq" />

            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#07327F] via-[#0b429d] to-[#041a45] text-white p-6 sm:p-8 shadow-xl shadow-blue-950/20">
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFC72C] text-[11px] font-bold tracking-wide uppercase mb-3">
                            <Sparkles size={13} />
                            <span>Akun Administrator Terverifikasi</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                            Selamat Datang di Panel CMS SIT At-Taufiq!
                        </h1>
                        <p className="mt-2 text-sm text-blue-100/90 leading-relaxed font-light">
                            Di sini Anda dapat langsung menambah, mengubah, dan menghapus konten website seperti berita sekolah, agenda kegiatan, galeri foto, dan kategori dengan mudah tanpa perlu coding.
                        </p>
                    </div>
                </div>

                {/* Grid Modul CMS */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-slate-800">
                            Menu Kelola Website
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">
                            Pilih modul untuk mulai mengedit
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {modules.map((mod) => {
                            const IconComponent = mod.icon;
                            return (
                                <div
                                    key={mod.title}
                                    className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <div className={`p-3 rounded-2xl ${mod.iconBg}`}>
                                                <IconComponent size={24} />
                                            </div>
                                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-full">
                                                {mod.stats}
                                            </span>
                                        </div>

                                        <h4 className="text-lg font-bold text-slate-800 mt-4 group-hover:text-[#07327F] transition">
                                            {mod.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                            {mod.desc}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                                        <Link
                                            href={mod.href}
                                            className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#07327F] hover:text-blue-800 transition"
                                        >
                                            <span>Kelola Data</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>

                                        {mod.createHref && (
                                            <Link
                                                href={mod.createHref}
                                                className="inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-[#07327F] hover:bg-[#07327F] hover:text-white transition"
                                            >
                                                <PlusCircle size={13} />
                                                <span>{mod.createLabel}</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Panduan Singkat Manual Edit */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-3.5">
                        <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5 sm:mt-0">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-800">
                                Tips Mengedit Website Secara Mandiri
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                Semua perubahan (tambah/edit/hapus) yang Anda simpan akan langsung tampil secara realtime di website utama SIT At-Taufiq Jambi. Gunakan resolusi gambar yang baik dan ukuran file yang wajar agar web tetap cepat dibuka.
                            </p>
                        </div>
                    </div>
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl bg-[#07327F] text-white hover:bg-[#052254] transition shadow-sm"
                    >
                        Buka Halaman Depan Web
                    </a>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
