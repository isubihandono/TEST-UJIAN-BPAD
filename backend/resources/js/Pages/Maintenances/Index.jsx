import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout';
import { Card } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Label } from '../../Components/Label';
import { Wrench, Plus, Search, Edit2, Trash2, X, Car, DollarSign, Building } from 'lucide-react';

export default function MaintenancesIndex({ maintenances, vehicles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        vehicle_id: '',
        service_date: '',
        description: '',
        cost: '',
        workshop: '',
        status: 'Proses',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/maintenances', { search }, { preserveState: true });
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
            vehicle_id: item.vehicle_id,
            service_date: item.service_date,
            description: item.description,
            cost: item.cost,
            workshop: item.workshop || '',
            status: item.status,
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
            put(`/maintenances/${editingItem.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/maintenances', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (item) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data perawatan ini?`)) {
            router.delete(`/maintenances/${item.id}`);
        }
    };

    return (
        <AuthenticatedLayout title="Perawatan & Servis">
            <Head title="Manajemen Perawatan KDO" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Manajemen Perawatan & Servis KDO</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Catat riwayat servis, perbaikan, dan biaya pemeliharaan kendaraan dinas.</p>
                </div>
                <Button onClick={openCreateModal} variant="primary" className="flex items-center gap-2 shadow-md shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Tambah Data Servis
                </Button>
            </div>

            <Card className="mb-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari deskripsi servis, bengkel, atau nomor polisi..."
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
                                <th className="py-3.5 px-4">Kendaraan (KDO)</th>
                                <th className="py-3.5 px-4">Tanggal Servis</th>
                                <th className="py-3.5 px-4">Deskripsi Perbaikan</th>
                                <th className="py-3.5 px-4">Bengkel & Biaya</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {maintenances.data.length > 0 ? (
                                maintenances.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4 text-slate-500">{maintenances.from + index}</td>
                                        <td className="py-3 px-4 font-semibold text-slate-900">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                                    <Car className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div>{item.vehicle?.police_number}</div>
                                                    <div className="text-xs text-slate-500 font-normal">{item.vehicle?.brand} {item.vehicle?.model}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700 text-xs font-medium">
                                            {item.service_date}
                                        </td>
                                        <td className="py-3 px-4 text-slate-600 text-xs max-w-xs">
                                            {item.description}
                                        </td>
                                        <td className="py-3 px-4 text-slate-700 text-xs">
                                            <div className="font-medium text-slate-900">{item.workshop || '-'}</div>
                                            <div className="text-emerald-600 font-semibold mt-0.5">Rp {Number(item.cost).toLocaleString('id-ID')}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                                                {item.status}
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
                                    <td colSpan="7" className="py-8 text-center text-slate-400">Tidak ada data perawatan ditemukan.</td>
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
                                {editingItem ? 'Edit Perawatan KDO' : 'Tambah Data Perawatan Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <Label htmlFor="vehicle_id">Kendaraan (KDO)</Label>
                                <select
                                    id="vehicle_id"
                                    value={data.vehicle_id}
                                    onChange={(e) => setData('vehicle_id', e.target.value)}
                                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1B84FF]"
                                >
                                    <option value="">-- Pilih Kendaraan --</option>
                                    {vehicles.map((v) => (
                                        <option key={v.id} value={v.id}>{v.police_number} - {v.brand} {v.model}</option>
                                    ))}
                                </select>
                                {errors.vehicle_id && <p className="text-xs text-rose-500 mt-1">{errors.vehicle_id}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="service_date">Tanggal Servis</Label>
                                    <Input
                                        id="service_date"
                                        type="date"
                                        value={data.service_date}
                                        onChange={(e) => setData('service_date', e.target.value)}
                                        className="mt-1"
                                    />
                                    {errors.service_date && <p className="text-xs text-rose-500 mt-1">{errors.service_date}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="cost">Biaya Servis (Rp)</Label>
                                    <Input
                                        id="cost"
                                        type="number"
                                        value={data.cost}
                                        onChange={(e) => setData('cost', e.target.value)}
                                        placeholder="0"
                                        className="mt-1"
                                    />
                                    {errors.cost && <p className="text-xs text-rose-500 mt-1">{errors.cost}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="workshop">Nama Bengkel</Label>
                                <Input
                                    id="workshop"
                                    value={data.workshop}
                                    onChange={(e) => setData('workshop', e.target.value)}
                                    placeholder="Contoh: Bengkel Resmi Toyota"
                                    className="mt-1"
                                />
                                {errors.workshop && <p className="text-xs text-rose-500 mt-1">{errors.workshop}</p>}
                            </div>
                            <div>
                                <Label htmlFor="description">Deskripsi Perbaikan / Servis</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="2"
                                    placeholder="Ganti oli, servis berkala, dll..."
                                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1B84FF]"
                                />
                                {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
                            </div>
                            <div>
                                <Label htmlFor="status">Status Pengerjaan</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1B84FF]"
                                >
                                    <option value="Proses">Proses Pengerjaan</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                                {errors.status && <p className="text-xs text-rose-500 mt-1">{errors.status}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button type="button" variant="secondary" onClick={closeModal}>Batal</Button>
                                <Button type="submit" variant="primary" disabled={processing}>
                                    {editingItem ? 'Simpan Perubahan' : 'Simpan Data Servis'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
