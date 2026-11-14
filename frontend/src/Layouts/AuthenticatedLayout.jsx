import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    Car,
    LayoutDashboard,
    Users,
    ShieldCheck,
    Calendar,
    Wrench,
    LogOut,
    Menu,
    X,
    UserCheck,
    Building2,
    ChevronDown
} from 'lucide-react';
import { Badge } from '../Components/Badge';

export function AuthenticatedLayout({ children, title = 'Dashboard' }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const roles = user?.roles || [];
    const permissions = user?.permissions || [];

    const hasPermission = (permission) => {
        return roles.includes('Super Admin') || permissions.includes(permission);
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, show: true },
        { name: 'Perangkat Daerah', href: '/perangkat-daerah', icon: Building2, show: hasPermission('manage vehicles') },
        { name: 'Pegawai PNS', href: '/employees', icon: Users, show: hasPermission('manage vehicles') },
        { name: 'Data Kendaraan', href: '/vehicles', icon: Car, show: hasPermission('manage vehicles') },
        { name: 'Peminjaman KDO', href: '/bookings', icon: Calendar, show: hasPermission('create booking') || hasPermission('approve booking') },
        { name: 'Perawatan & Servis', href: '/maintenances', icon: Wrench, show: hasPermission('manage maintenance') },
        { name: 'Manajemen User', href: '/users', icon: Users, show: hasPermission('manage users') },
        { name: 'Role & Permission', href: '/roles', icon: ShieldCheck, show: hasPermission('manage roles') },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Metronic Design */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transform transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Logo Brand */}
                <div className="h-16 flex items-center justify-between px-6 bg-slate-950/60 border-b border-slate-800">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1B84FF] flex items-center justify-center text-white font-bold">
                            <Car className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="font-bold text-white text-base tracking-tight">KDO System</span>
                            <span className="block text-[10px] text-slate-400 font-normal">v1.0 Metronic</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User Info Snippet */}
                <div className="p-4 mx-3 my-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1B84FF]/20 text-[#1B84FF] font-semibold text-sm flex items-center justify-center border border-[#1B84FF]/30">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                            {roles.map((r) => (
                                <span key={r} className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-medium">
                                    {r}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
                    <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Menu Utama
                    </p>
                    {navigation.filter(item => item.show).map((item) => {
                        const Icon = item.icon;
                        const active = window.location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    active
                                        ? 'bg-[#1B84FF] text-white shadow-xs'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Footer */}
                <div className="p-3 border-t border-slate-800 bg-slate-950/40">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar / Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header Navbar */}
                <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-semibold text-slate-800">{user?.name}</span>
                            <span className="text-xs text-slate-500">{user?.email}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
