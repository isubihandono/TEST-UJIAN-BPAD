import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { GuestLayout } from '../../Layouts/GuestLayout';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Label } from '../../Components/Label';
import { ShieldAlert, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const fillCredentials = (email, password = 'password') => {
        setData((prevData) => ({
            ...prevData,
            email,
            password,
        }));
    };

    return (
        <GuestLayout>
            <Head title="Sign In - KDO System" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign In</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Welcome back! Log in with your credentials.
                </p>
            </div>

            <div className="mb-6 p-3 bg-blue-50/80 border border-blue-200/60 rounded-xl flex items-start gap-3 text-xs text-blue-800">
                <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                    <span className="font-semibold block mb-0.5">Demo Access Notice:</span>
                    Gunakan tombol akun demo RBAC di bawah untuk pengujian cepat dengan kredensial yang valid.
                </div>
            </div>

            {errors.email && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errors.email}</span>
                </div>
            )}

            <button
                type="button"
                onClick={() => fillCredentials('admin@kdo.com')}
                className="w-full mb-6 flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-xs transition-all"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Sign in with Google (Demo)
            </button>

            <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="absolute bg-white px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Or</span>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="email" required>Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="name@example.com"
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        required
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" required>Password</Label>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-[#1B84FF] hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            placeholder="••••••••"
                            className="pr-10"
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-300 text-[#1B84FF] focus:ring-[#1B84FF]"
                        />
                        <span className="text-xs text-slate-600 font-medium">Remember me</span>
                    </label>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-2.5 mt-2 shadow-md shadow-blue-500/20"
                    disabled={processing}
                >
                    {processing ? 'Processing...' : 'Sign In'}
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">
                    Don't have an account?{' '}
                    <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-[#1B84FF] hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>

            {/* Quick Helper for Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Quick Select Demo Account (RBAC):
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                        type="button"
                        onClick={() => fillCredentials('admin@kdo.com')}
                        className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                        <span className="font-semibold block text-slate-800">Super Admin</span>
                        <span className="text-[10px] text-slate-500">admin@kdo.com</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => fillCredentials('adminkdo@kdo.com')}
                        className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                        <span className="font-semibold block text-slate-800">Admin KDO</span>
                        <span className="text-[10px] text-slate-500">adminkdo@kdo.com</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => fillCredentials('approver@kdo.com')}
                        className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                        <span className="font-semibold block text-slate-800">Approver</span>
                        <span className="text-[10px] text-slate-500">approver@kdo.com</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => fillCredentials('driver@kdo.com')}
                        className="p-2 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                        <span className="font-semibold block text-slate-800">Driver</span>
                        <span className="text-[10px] text-slate-500">driver@kdo.com</span>
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}
