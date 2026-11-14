import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout';
import { Card, CardHeader } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Label } from '../../Components/Label';
import { Building2, Plus, Search, Edit2, Trash2, X, Phone, MapPin } from 'lucide-react';

export default function PerangkatDaerahIndex({ perangkatDaerahs, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        code: '',
        address: '',
        phone: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/perangkat-daerah', { search }, { preserveState: true });
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
            code: item.code,
            address: item.address || '',
            phone: item.phone || '',
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
            put(`/perangkat-daerah/${editingItem.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/perangkat-daerah', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (item) => {
        if (confirm(`Apakah Anda yakin ingin menghapus Perangkat Daerah ${item.name}?`)) {
            router.delete(`/perangkat-daerah/${item.id}`);
        }
    };

    return (
        <AuthenticatedLayout title="Perangkat Daerah (PD)">
            <Head title="Manajemen Perangkat Daerah" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Manajemen Perangkat Daerah (PD)</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Kelola instansi atau SKPD yang menggunakan kendaraan dinas.</p>
                </div>
                <Button onClick={openCreateModal} variant="primary" className="flex items-center gap-2 shadow-md shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Tambah Perangkat Daerah
                </Button>
            </div>

            <Card className="mb-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama atau kode perangkat daerah..."
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
                                <th className="py-3.5 px-4">Kode Instansi</th>
                                <th className="py-3.5 px-4">Nama Perangkat Daerah</th>
                                <th className="py-3.5 px-4">Alamat & Kontak</th>
                                <th className="py-3.5 px-4 text-center">Jumlah Pegawai</th>
                                <th className="py-3.5 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {perangkatDaerahs.data.length > 0 ? (
                                perangkatDaerahs.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4 text-slate-500">{perangkatDaerahs.from + index}</td>
                                        <td className="py-3 px-4 font-semibold text-slate-900">
                                            <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-mono">{item.code}</span>
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B84FF] flex items-center justify-center">
                                                <Building2 className="w-4 h-4" />
                                            </div>
                                            {item.name}
                                        </td>
                                        <td className="py-3 px-4 text-slate-600">
                                            <div className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="w-3.5 h-3.5" /> {item.address || '-'}</div>
                                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5"><Phone className="w-3.5 h-3.5" /> {item.phone || '-'}</div>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold">
                                                {item.employees_count || 0} Pegawai
                                            </span>
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
                                    <td colSpan="6" className="py-8 text-center text-slate-400">Tidak ada data Perangkat Daerah ditemukan.</td>
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
                                {editingItem ? 'Edit Perangkat Daerah' : 'Tambah Perangkat Daerah Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <Label htmlFor="code">Kode Instansi</Label>
                                <Input
                                    id="code"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    placeholder="Contoh: DIN-DIK"
                                    className="mt-1"
                                />
                                {errors.code && <p className="text-xs text-rose-500 mt-1">{errors.code}</p>}
                            </div>
                            <div>
                                <Label htmlFor="name">Nama Perangkat Daerah</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Dinas Pendidikan"
                                    className="mt-1"
                                />
                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="address">Alamat Kantor</Label>
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows="2"
                                    placeholder="Alamat lengkap instansi..."
                                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1B84FF]"
                                />
                                {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address}</p>}
                            </div>
                            <div>
                                <Label htmlFor="phone">Nomor Telepon</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="021-xxxxxxxx"
                                    className="mt-1"
                                />
                                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button type="button" variant="secondary" onClick={closeModal}>Batal</Button>
                                <Button type="submit" variant="primary" disabled={processing}>
                                    {editingItem ? 'Simpan Perubahan' : 'Tambah Instansi'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
