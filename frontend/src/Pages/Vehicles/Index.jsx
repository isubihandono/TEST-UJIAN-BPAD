import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout';
import { Card, CardHeader } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Label } from '../../Components/Label';
import { Car, Plus, Search, Edit2, Trash2, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

export default function VehiclesIndex({ vehicles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        police_number: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        condition: 'Baik',
        status: 'Tersedia',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/vehicles', { search }, { preserveState: true });
    };

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditingVehicle(null);
        setIsModalOpen(true);
    };

    const openEditModal = (vehicle) => {
        clearErrors();
        setEditingVehicle(vehicle);
        setData({
            police_number: vehicle.police_number,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            color: vehicle.color,
            condition: vehicle.condition,
            status: vehicle.status,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingVehicle(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingVehicle) {
            put(`/vehicles/${editingVehicle.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/vehicles', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (vehicle) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kendaraan ${vehicle.police_number} (${vehicle.brand} ${vehicle.model})?`)) {
            router.delete(`/vehicles/${vehicle.id}`);
        }
    };

    const getConditionBadge = (condition) => {
        switch (condition) {
            case 'Baik':
                return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1 w-max"><CheckCircle2 className="w-3.5 h-3.5" /> Baik</span>;
            case 'Rusak Ringan':
                return <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold rounded-lg flex items-center gap-1 w-max"><AlertTriangle className="w-3.5 h-3.5" /> Rusak Ringan</span>;
            case 'Rusak Berat':
                return <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold rounded-lg flex items-center gap-1 w-max"><XCircle className="w-3.5 h-3.5" /> Rusak Berat</span>;
            default:
                return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">{condition}</span>;
        }
    };

    return (
        <AuthenticatedLayout title="Data Kendaraan Dinas (KDO)">
            <Head title="Manajemen Kendaraan KDO" />

            {/* Top Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Manajemen Kendaraan Dinas Operasional</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Kelola data inventaris, kondisi, dan status operasional KDO.</p>
                </div>
                <Button onClick={openCreateModal} variant="primary" className="flex items-center gap-2 shadow-md shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Tambah Kendaraan KDO
                </Button>
            </div>

            {/* Search & Filter Bar */}
            <Card className="mb-6">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari berdasarkan nomor polisi, merk, atau model kendaraan..."
                            className="pl-10"
                        />
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    </div>
                    <Button type="submit" variant="secondary">Cari</Button>
                </form>
            </Card>

            {/* Vehicles Table Card */}
            <Card padding="none">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="py-3.5 px-6">No. Polisi</th>
                                <th className="py-3.5 px-6">Merk &amp; Model</th>
                                <th className="py-3.5 px-6">Tahun / Warna</th>
                                <th className="py-3.5 px-6">Kondisi</th>
                                <th className="py-3.5 px-6">Status Operasional</th>
                                <th className="py-3.5 px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {vehicles.data.length > 0 ? (
                                vehicles.data.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1B84FF] flex items-center justify-center shrink-0">
                                                <Car className="w-4 h-4" />
                                            </div>
                                            {vehicle.police_number}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-slate-800">{vehicle.brand}</div>
                                            <div className="text-xs text-slate-500">{vehicle.model}</div>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600">
                                            <div>{vehicle.year}</div>
                                            <div className="text-xs text-slate-400">{vehicle.color}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {getConditionBadge(vehicle.condition)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                                                {vehicle.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <button
                                                onClick={() => openEditModal(vehicle)}
                                                className="p-1.5 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-lg transition-colors"
                                                title="Edit Kendaraan"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(vehicle)}
                                                className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-colors"
                                                title="Hapus Kendaraan"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-slate-400">
                                        Belum ada data kendaraan dinas yang terdaftar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-lg">
                                {editingVehicle ? 'Edit Data Kendaraan KDO' : 'Tambah Kendaraan KDO Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <Label htmlFor="police_number" required>Nomor Polisi Kendaraan</Label>
                                <Input
                                    id="police_number"
                                    value={data.police_number}
                                    placeholder="Contoh: B 1234 ABC"
                                    onChange={(e) => setData('police_number', e.target.value)}
                                    error={errors.police_number}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="brand" required>Merk Kendaraan</Label>
                                    <Input
                                        id="brand"
                                        value={data.brand}
                                        placeholder="Contoh: Toyota"
                                        onChange={(e) => setData('brand', e.target.value)}
                                        error={errors.brand}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="model" required>Tipe / Model</Label>
                                    <Input
                                        id="model"
                                        value={data.model}
                                        placeholder="Contoh: Camry 2.5"
                                        onChange={(e) => setData('model', e.target.value)}
                                        error={errors.model}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="year" required>Tahun Produksi</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        error={errors.year}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="color" required>Warna Kendaraan</Label>
                                    <Input
                                        id="color"
                                        value={data.color}
                                        placeholder="Contoh: Hitam Metalik"
                                        onChange={(e) => setData('color', e.target.value)}
                                        error={errors.color}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="condition" required>Kondisi Kendaraan</Label>
                                    <select
                                        id="condition"
                                        value={data.condition}
                                        onChange={(e) => setData('condition', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#1B84FF]/20 focus:border-[#1B84FF]"
                                        required
                                    >
                                        <option value="Baik">Baik</option>
                                        <option value="Rusak Ringan">Rusak Ringan</option>
                                        <option value="Rusak Berat">Rusak Berat</option>
                                    </select>
                                    {errors.condition && <span className="text-xs text-red-600 mt-1 block">{errors.condition}</span>}
                                </div>

                                <div>
                                    <Label htmlFor="status" required>Status Operasional</Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#1B84FF]/20 focus:border-[#1B84FF]"
                                        required
                                    >
                                        <option value="Tersedia">Tersedia</option>
                                        <option value="Dipinjam">Dipinjam</option>
                                        <option value="Perawatan">Perawatan</option>
                                        <option value="Non-Aktif">Non-Aktif</option>
                                    </select>
                                    {errors.status && <span className="text-xs text-red-600 mt-1 block">{errors.status}</span>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button type="button" variant="secondary" onClick={closeModal}>Batal</Button>
                                <Button type="submit" variant="primary" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
