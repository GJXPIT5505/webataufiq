import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke Panel CMS" />

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Masuk ke Panel CMS</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Silakan masukkan email atau username untuk mengelola website SIT At-Taufiq.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email atau Username" />

                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-[#07327F] focus:ring focus:ring-[#07327F]/20 text-sm"
                        autoComplete="username"
                        placeholder="admin@attaufiq.sch.id"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi (Password)" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-[#07327F] hover:underline"
                            >
                                Lupa kata sandi?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-[#07327F] focus:ring focus:ring-[#07327F]/20 text-sm"
                        autoComplete="current-password"
                        placeholder="••••••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded text-[#07327F] focus:ring-[#07327F]"
                        />
                        <span className="ms-2 text-xs text-slate-600">
                            Ingat saya di perangkat ini
                        </span>
                    </label>

                    <Link
                        href={route('register')}
                        className="text-xs text-[#07327F] hover:underline font-semibold"
                    >
                        Daftar akun baru
                    </Link>
                </div>

                <div className="pt-3">
                    <PrimaryButton
                        className="w-full justify-center bg-[#07327F] hover:bg-[#052254] active:bg-[#031433] rounded-xl py-3 text-xs font-bold tracking-wider uppercase text-white shadow-md shadow-blue-900/20"
                        disabled={processing}
                    >
                        {processing ? 'Memverifikasi...' : 'Masuk ke CMS'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
