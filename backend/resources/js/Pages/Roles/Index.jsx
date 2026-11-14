import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout';
import { Card } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Label } from '../../Components/Label';
import { ShieldCheck, Plus, Edit2, Trash2, X, Shield, Check } from 'lucide-react';

export default function RolesIndex({ roles, permissions }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        permissions: [],
    });

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (role) => {
        clearErrors();
        setEditingItem(role);
        setData({
            name: role.name,
            permissions: role.permissions?.map(p => p.name) || [],
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        reset();
    };

    const handleCheckboxChange = (permissionName) => {
        const currentPermissions = [...data.permissions];
        if (currentPermissions.includes(permissionName)) {
            setData('permissions', currentPermissions.filter(p => p !== permissionName));
        } else {
            setData('permissions', [...currentPermissions, permissionName]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            put(`/roles/${editingItem.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/roles', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (role) => {
        if (confirm(`Apakah Anda yakin ingin menghapus role ${role.name}?`)) {
            router.delete(`/roles/${role.id}`);
        }
    };

    return (
        <AuthenticatedLayout title="Role & Permission">
            <Head title="Manajemen Role & Permission" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Manajemen Role & Permission</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Kelola hak akses dan peran (role) pengguna dalam sistem.</p>
                </div>
                <Button onClick={openCreateModal} variant="primary" className="flex items-center gap-2 shadow-md shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Tambah Role Baru
                </Button>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase bg-slate-50/50">
                                <th className="py-3.5 px-4">No</th>
                                <th className="py-3.5 px-4">Nama Role</th>
                                <th className="py-3.5 px-4">Daftar Permission (Hak Akses)</th>
                                <th className="py-3.5 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {roles.length > 0 ? (
                                roles.map((role, index) => (
                                    <tr key={role.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4 text-slate-500">{index + 1}</td>
                                        <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <ShieldCheck className="w-4 h-4" />
                                            </div>
                                            {role.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {role.permissions?.map((p) => (
                                                    <span key={p.name} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded">
                                                        {p.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button onClick={() => openEditModal(role)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                {!['Super Admin', 'Admin KDO'].includes(role.name) && (
                                                    <button onClick={() => handleDelete(role)} className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-slate-400">Tidak ada data role ditemukan.</td>
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
                                {editingItem ? 'Edit Role & Permissions' : 'Tambah Role Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <Label htmlFor="name">Nama Role</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Staff Keuangan"
                                    className="mt-1"
                                />
                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <Label className="mb-2 block">Pilih Permissions (Hak Akses)</Label>
                                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    {permissions.map((p) => (
                                        <label key={p.id} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.permissions.includes(p.name)}
                                                onChange={() => handleCheckboxChange(p.name)}
                                                className="rounded border-slate-300 text-[#1B84FF] focus:ring-[#1B84FF]"
                                            />
                                            {p.name}
                                        </label>
                                    ))}
                                </div>
                                {errors.permissions && <p className="text-xs text-rose-500 mt-1">{errors.permissions}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button type="button" variant="secondary" onClick={closeModal}>Batal</Button>
                                <Button type="submit" variant="primary" disabled={processing}>
                                    {editingItem ? 'Simpan Perubahan' : 'Buat Role'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
