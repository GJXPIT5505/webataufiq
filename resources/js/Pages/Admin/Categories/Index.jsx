import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { 
    BookOpen, 
    GraduationCap, 
    Palette, 
    Dumbbell, 
    Flag, 
    HeartHandshake, 
    Sparkles, 
    Sprout, 
    Award,
    Tag,
    ChevronDown,
    Check
} from 'lucide-react';

// 1. Daftar Ikon Pilihan + Label yang Ramah Pengguna
const ICON_OPTIONS = [
    { key: 'Tag', label: 'Umum / Tag', icon: Tag },
    { key: 'BookOpen', label: "Tahfidz & Qur'an", icon: BookOpen },
    { key: 'GraduationCap', label: 'Akademik & Prestasi', icon: GraduationCap },
    { key: 'Palette', label: 'Seni & Kreativitas', icon: Palette },
    { key: 'Dumbbell', label: 'Olahraga & Jasmani', icon: Dumbbell },
    { key: 'Flag', label: 'Kepemimpinan & Pramuka', icon: Flag },
    { key: 'HeartHandshake', label: 'Parenting & Sosial', icon: HeartHandshake },
    { key: 'Sparkles', label: 'Keislaman & Adab', icon: Sparkles },
    { key: 'Sprout', label: 'Lingkungan & Sains', icon: Sprout },
    { key: 'Award', label: 'Pelepasan & Wisuda', icon: Award },
];

export default function CategoryIndex({ auth, categories = [] }) {
    const { flash } = usePage().props;
    const [editCategory, setEditCategory] = useState(null);
    const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { data, setData, post, put, reset, errors, processing } = useForm({
        name: '',
        icon: 'Tag',
    });

    // Menutup dropdown otomatis jika klik di luar area
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsIconDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helper mengambil komponen ikon terpilih
    const currentIconObj = ICON_OPTIONS.find(item => item.key === data.icon) || ICON_OPTIONS[0];
    const SelectedIconComponent = currentIconObj.icon;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editCategory) {
            put(route('admin.categories.update', editCategory.id), {
                onSuccess: () => {
                    reset();
                    setEditCategory(null);
                }
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (category) => {
        setEditCategory(category);
        setData({
            name: category.name,
            icon: category.icon || 'Tag',
        });
    };

    const handleCancelEdit = () => {
        setEditCategory(null);
        reset();
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#07327F] leading-tight font-serif">Kelola Kategori Berita</h2>}
        >
            <Head title="Admin - Kategori" />

            <div className="py-12 bg-[#FAF8F5] min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {flash?.message && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm flex items-center space-x-2 text-sm font-medium">
                            <span>✅</span>
                            <span>{flash.message}</span>
                        </div>
                    )}

                    {/* Form Input Tambah / Edit */}
                    <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                                
                                {/* 1. Nama Kategori */}
                                <div className="sm:col-span-6">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">
                                        {editCategory ? '✏️ Edit Nama Kategori' : '➕ Tambah Kategori Baru'}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Ekstrakurikuler, Prestasi, PPDB"
                                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-[#07327F] focus:border-[#07327F] transition h-[42px]"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* 2. Custom Icon Dropdown Picker */}
                                <div className="sm:col-span-4 relative" ref={dropdownRef}>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-[#07327F] mb-2">
                                        Pilih Icon Visual
                                    </label>
                                    
                                    {/* Trigger Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsIconDropdownOpen(!isIconDropdownOpen)}
                                        className="w-full flex items-center justify-between px-3.5 py-2 border border-slate-300 rounded-xl bg-white text-sm hover:border-[#07327F] focus:outline-none focus:ring-2 focus:ring-[#07327F]/20 transition h-[42px]"
                                    >
                                        <div className="flex items-center space-x-2.5 overflow-hidden">
                                            <div className="p-1 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] text-[#8B6B13]">
                                                <SelectedIconComponent size={16} />
                                            </div>
                                            <span className="font-medium text-slate-700 truncate text-xs">
                                                {currentIconObj.label}
                                            </span>
                                        </div>
                                        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isIconDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu Box */}
                                    {isIconDropdownOpen && (
                                        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#E8DFC8] shadow-xl z-50 p-2 max-h-60 overflow-y-auto space-y-1">
                                            {ICON_OPTIONS.map((item) => {
                                                const ItemIcon = item.icon;
                                                const isSelected = data.icon === item.key;
                                                return (
                                                    <button
                                                        key={item.key}
                                                        type="button"
                                                        onClick={() => {
                                                            setData('icon', item.key);
                                                            setIsIconDropdownOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition ${
                                                            isSelected 
                                                                ? 'bg-[#FAF8F5] text-[#07327F] font-bold border border-[#E8DFC8]' 
                                                                : 'hover:bg-slate-50 text-slate-700'
                                                        }`}
                                                    >
                                                        <div className="flex items-center space-x-2.5">
                                                            <div className={`p-1.5 rounded-lg border ${
                                                                isSelected 
                                                                    ? 'bg-[#F3EBDD] border-[#D4AF37] text-[#8B6B13]' 
                                                                    : 'bg-slate-100 border-slate-200 text-slate-500'
                                                            }`}>
                                                                <ItemIcon size={14} />
                                                            </div>
                                                            <span>{item.label}</span>
                                                        </div>
                                                        {isSelected && <Check size={14} className="text-[#8B6B13]" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* 3. Tombol Aksi */}
                                <div className="sm:col-span-2 flex items-center gap-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#07327F] hover:bg-[#051C42] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md whitespace-nowrap h-[42px]"
                                    >
                                        {editCategory ? 'Update' : 'Simpan'}
                                    </button>

                                    {editCategory && (
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2.5 rounded-xl font-bold text-xs uppercase transition h-[42px]"
                                        >
                                            Batal
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Tabel List Kategori */}
                    <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-sm overflow-hidden p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold font-serif text-[#07327F]">Daftar Kategori</h3>
                            <p className="text-xs text-slate-500 font-light">Kategori beserta ikon visual untuk artikel dan berita sekolah.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600 border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                                        <th className="p-4 rounded-l-xl">#</th>
                                        <th className="p-4">Icon & Nama Kategori</th>
                                        <th className="p-4">Slug</th>
                                        <th className="p-4 text-center">Jumlah Post</th>
                                        <th className="p-4 text-right rounded-r-xl">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {categories.length > 0 ? (
                                        categories.map((cat, index) => {
                                            const iconEntry = ICON_OPTIONS.find(i => i.key === cat.icon);
                                            const RowIconComp = iconEntry ? iconEntry.icon : Tag;
                                            return (
                                                <tr key={cat.id} className="hover:bg-slate-50/80 transition duration-150">
                                                    <td className="p-4 font-medium text-slate-400">{index + 1}</td>
                                                    <td className="p-4">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] text-[#8B6B13] flex items-center justify-center shadow-xs">
                                                                <RowIconComp size={16} />
                                                            </div>
                                                            <span className="font-bold text-[#07327F]">{cat.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-slate-400 italic text-xs">{cat.slug}</td>
                                                    <td className="p-4 text-center">
                                                        <span className="bg-blue-50 text-[#07327F] px-3 py-1 rounded-full text-xs font-bold border border-blue-200/60">
                                                            {cat.posts_count ?? 0} Artikel
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                                                        <button
                                                            onClick={() => handleEdit(cat)}
                                                            className="text-amber-600 hover:text-amber-800 font-bold text-xs uppercase tracking-wider transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(cat.id)}
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
                                                Belum ada kategori. Silakan tambahkan kategori baru di atas.
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