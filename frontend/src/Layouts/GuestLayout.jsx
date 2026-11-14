import React from 'react';
import { Car } from 'lucide-react';

export function GuestLayout({ children }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Form Container */}
            <div className="flex items-center justify-center p-8 lg:p-12 bg-white">
                <div className="w-full max-w-md">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[#1B84FF] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                            <Car className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 tracking-tight">KDO System</h1>
                            <p className="text-xs text-slate-500">Kendaraan Dinas Operasional</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>

            {/* Right Metronic Showcase Panel */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('/media/app/auth-bg.png')` }}>
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"></div>

                <div className="flex justify-end relative z-10">
                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full border border-white/10">
                        BMD &amp; KDO Management
                    </span>
                </div>

                <div className="relative z-10 max-w-lg my-auto py-12">
                    <div className="mb-6 inline-flex p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                        <Car className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold leading-tight text-white">
                        Secure Dashboard Access
                    </h2>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                        A robust authentication gateway ensuring secure efficient user access to the KDO Dashboard interface and Barang Milik Daerah management.
                    </p>
                    <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/50">
                        <img src="/media/app/auth-screen.png" alt="Dashboard Preview" className="w-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                <div className="text-xs text-slate-400 relative z-10 flex items-center justify-between">
                    <span>&copy; {new Date().getFullYear()} KDO System. All rights reserved.</span>
                    <span className="text-slate-500">Metronic Tailwind v9</span>
                </div>
            </div>
        </div>
    );
}
