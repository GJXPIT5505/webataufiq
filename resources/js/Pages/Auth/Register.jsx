import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun Baru" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Daftar Akun Baru</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Silakan isi formulir di bawah untuk membuat akun baru.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-[#07327F] focus:ring focus:ring-[#07327F]/20 text-sm"
                        autoComplete="name"
                        isFocused={true}
                        placeholder="Contoh: Muhammad Firman"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-[#07327F] focus:ring focus:ring-[#07327F]/20 text-sm"
                        autoComplete="username"
                        placeholder="nama@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi (Password)" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-[#07327F] focus:ring focus:ring-[#07327F]/20 text-sm"
                        autoComplete="new-password"
                        placeholder="Minimal 8 karakter"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-[#07327F] focus:ring focus:ring-[#07327F]/20 text-sm"
                        autoComplete="new-password"
                        placeholder="Ulangi kata sandi di atas"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href={route('login')}
                        className="text-xs text-[#07327F] hover:underline font-medium"
                    >
                        Sudah punya akun? Masuk di sini
                    </Link>

                    <PrimaryButton
                        className="w-full sm:w-auto bg-[#07327F] hover:bg-[#052254] active:bg-[#031433] rounded-xl px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-white shadow-md shadow-blue-900/20"
                        disabled={processing}
                    >
                        {processing ? 'Mendaftar...' : 'Daftar Sekarang'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}