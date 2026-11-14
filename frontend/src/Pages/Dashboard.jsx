import React from 'react';
import { Head } from '@inertiajs/react';
import { AuthenticatedLayout } from '../Layouts/AuthenticatedLayout';
import { Card, CardHeader } from '../Components/Card';
import { Badge } from '../Components/Badge';
import { Car, CheckCircle2, Clock, Shield, User, Key, ArrowRight } from 'lucide-react';

export default function Dashboard({ user, stats }) {
    const roles = user?.roles || [];
    const permissions = user?.permissions || [];

    return (
        <AuthenticatedLayout title="Dashboard KDO">
            <Head title="Dashboard" />

            {/* Welcome Banner */}
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold rounded-full inline-block mb-3">
                        Selamat Datang Kembali
                    </span>
                    <h2 className="text-2xl font-bold">Halo, {user?.name}!</h2>
                    <p className="text-sm text-slate-300 mt-1 max-w-xl">
                        Anda telah berhasil masuk ke Sistem Kendaraan Dinas Operasional (KDO) menggunakan akun ber-Role:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {roles.map((role) => (
                            <Badge key={role} variant="primary" className="text-xs px-3 py-1 bg-blue-600/30 border-blue-400 text-blue-200">
                                🛡️ Role: {role}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Car className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Kendaraan</p>
                        <p className="text-2xl font-bold text-slate-900 mt-0.5">{stats?.total_vehicles || 0}</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tersedia Saat Ini</p>
                        <p className="text-2xl font-bold text-slate-900 mt-0.5">{stats?.available_vehicles || 0}</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking Aktif</p>
                        <p className="text-2xl font-bold text-slate-900 mt-0.5">{stats?.active_bookings || 0}</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Menunggu Persetujuan</p>
                        <p className="text-2xl font-bold text-slate-900 mt-0.5">{stats?.pending_approvals || 0}</p>
                    </div>
                </Card>
            </div>

            {/* Role & Permissions Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader
                        title="Informasi Profil & Role RBAC"
                        subtitle="Hak akses yang dimiliki oleh akun pengguna aktif saat ini"
                    />
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-500 font-medium flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400" /> Nama Lengkap
                            </span>
                            <span className="font-semibold text-slate-800">{user?.name}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">Email System</span>
                            <span className="font-semibold text-slate-800">{user?.email}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-500 font-medium">Peran / Role Utama</span>
                            <div className="flex gap-1">
                                {roles.map((r) => (
                                    <Badge key={r} variant="primary">{r}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <CardHeader
                        title="Daftar Hak Akses / Permissions"
                        subtitle="Detail izin yang diberikan kepada role pengguna ini"
                    />
                    <div className="flex flex-wrap gap-2">
                        {permissions.length > 0 ? (
                            permissions.map((perm) => (
                                <span
                                    key={perm}
                                    className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                                >
                                    <Key className="w-3.5 h-3.5 text-blue-500" />
                                    {perm}
                                </span>
                            ))
                        ) : (
                            <p className="text-xs text-slate-400">Tidak ada permission khusus secara individual.</p>
                        )}
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
