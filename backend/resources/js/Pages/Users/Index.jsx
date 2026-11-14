import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout';
import { Card } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Label } from '../../Components/Label';
import { Users, Plus, Search, Edit2, Trash2, X, Shield, Mail } from 'lucide-react';

export default function UsersIndex({ users, roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/users', { search }, { preserveState: true });
    };

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        clearErrors();
        setEditingItem(item);
        setData({
            name: item.name,
            email: item.email,
            password: '',
            role: item.roles?.[0]?.name || '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            put(`/users/${editingItem.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/users', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (item) => {
        if (confirm(`Apakah Anda yakin ingin menghapus user ${item.name}?`)) {
            router.delete(`/users/${item.id}`);
        }
    };

    return (
        <AuthenticatedLayout title="Manajemen User">
            <Head title="Manajemen User" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Manajemen Pengguna Sistem</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Kelola akun pengguna dan hak akses role dalam aplikasi KDO.</p>
                </div>
                <Button onClick={openCreateModal} variant="primary" className="flex items-center gap-2 shadow-md shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Tambah User Baru
                </Button>
            </div>

            <Card className="mb-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama atau email user..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1B84FF]"
                        />
                    </div>
                    <Button type="submit" variant="secondary">Cari</Button>
                </form>
            </Card>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase bg-slate-50/50">
                                <th className="py-3.5 px-4">No</th>
                                <th className="py-3.5 px-4">Nama Pengguna</th>
                                <th className="py-3.5 px-4">Email</th>
                                <th className="py-3.5 px-4">Role / Peran</th>
                                <th className="py-3.5 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {users.data.length > 0 ? (
                                users.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4 text-slate-500">{users.from + index}</td>
                                        <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B84FF] flex items-center justify-center font-bold">
                                                {item.name.charAt(0).toUpperCase()}
                                            </div>
                                            {item.name}
                                        </td>
                                        <td className="py-3 px-4 text-slate-600">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" /> {item.email}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            {item.roles?.map((role) => (
                                                <span key={role.name} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1 w-max">
                                                    <Shield className="w-3 h-3" /> {role.name}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button onClick={() => openEditModal(item)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(item)} className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-slate-400">Tidak ada data User ditemukan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-900">
                                {editingItem ? 'Edit Akun User' : 'Tambah User Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Nama pengguna..."
                                    className="mt-1"
                                />
                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email Login</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@kdo.com"
                                    className="mt-1"
                                />
                                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password">Password {editingItem && '(Kosongkan jika tidak diubah)'}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimal 6 karakter"
                                    className="mt-1"
                                />
                                {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <Label htmlFor="role">Role / Peran</Label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1B84FF]"
                                >
                                    <option value="">-- Pilih Role --</option>
                                    {roles.map((role) => (
                                        <option key={role.name} value={role.name}>{role.name}</option>
                                    ))}
                                </select>
                                {errors.role && <p className="text-xs text-rose-500 mt-1">{errors.role}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button type="button" variant="secondary" onClick={closeModal}>Batal</Button>
                                <Button type="submit" variant="primary" disabled={processing}>
                                    {editingItem ? 'Simpan Perubahan' : 'Buat Akun'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
