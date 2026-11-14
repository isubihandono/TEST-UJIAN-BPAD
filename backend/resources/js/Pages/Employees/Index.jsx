import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { AuthenticatedLayout } from '../../Layouts/AuthenticatedLayout';
import { Card, CardHeader } from '../../Components/Card';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { Label } from '../../Components/Label';
import { UserCheck, Plus, Search, Edit2, Trash2, X, Briefcase, Award } from 'lucide-react';

export default function EmployeesIndex({ employees, perangkatDaerahs, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        nip: '',
        position: '',
        golongan: '',
        perangkat_daerah_id: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employees', { search }, { preserveState: true });
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
            nip: item.nip,
            position: item.position,
            golongan: item.golongan,
            perangkat_daerah_id: item.perangkat_daerah_id || '',
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
            put(`/employees/${editingItem.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/employees', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (item) => {
        if (confirm(`Apakah Anda yakin ingin menghapus Pegawai ${item.name}?`)) {
            router.delete(`/employees/${item.id}`);
        }
    };

    return (
        <AuthenticatedLayout title="Pegawai Negeri Sipil (PNS)">
            <Head title="Manajemen Pegawai PNS" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Manajemen Pegawai Negeri Sipil (PNS)</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Kelola data pegawai yang menjadi penanggung jawab kendaraan dinas.</p>
                </div>
                <Button onClick={openCreateModal} variant="primary" className="flex items-center gap-2 shadow-md shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Tambah Pegawai PNS
                </Button>
            </div>

            <Card className="mb-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama, NIP, atau jabatan pegawai..."
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
                                <th className="py-3.5 px-4">Nama Pegawai & NIP</th>
                                <th className="py-3.5 px-4">Jabatan & Golongan</th>
                                <th className="py-3.5 px-4">Perangkat Daerah (Instansi)</th>
                                <th className="py-3.5 px-4 text-center">Tanggung Jawab KDO</th>
                                <th className="py-3.5 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                            {employees.data.length > 0 ? (
                                employees.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-3 px-4 text-slate-500">{employees.from + index}</td>
                                        <td className="py-3 px-4">
                                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                    <UserCheck className="w-4 h-4" />
                                                </div>
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-slate-500 font-mono mt-0.5">NIP. {item.nip}</div>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700">
                                            <div className="flex items-center gap-1 text-xs font-medium"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> {item.position}</div>
                                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5"><Award className="w-3.5 h-3.5 text-slate-400" /> Gol. {item.golongan}</div>
                                        </td>
                                        <td className="py-3 px-4 text-slate-600 text-xs">
                                            {item.perangkat_daerah ? (
                                                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 font-medium rounded text-slate-800">
                                                    {item.perangkat_daerah.name}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 italic">Tidak ada instansi</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">
                                                {item.vehicles_count || 0} Kendaraan
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
                                    <td colSpan="6" className="py-8 text-center text-slate-400">Tidak ada data Pegawai PNS ditemukan.</td>
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
                                {editingItem ? 'Edit Pegawai PNS' : 'Tambah Pegawai PNS Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <Label htmlFor="name">Nama Lengkap & Gelar</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Budi Santoso, S.T."
                                    className="mt-1"
                                />
                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="nip">NIP (Nomor Induk Pegawai)</Label>
                                <Input
                                    id="nip"
                                    value={data.nip}
                                    onChange={(e) => setData('nip', e.target.value)}
                                    placeholder="Contoh: 198501012010011001"
                                    className="mt-1"
                                />
                                {errors.nip && <p className="text-xs text-rose-500 mt-1">{errors.nip}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="position">Jabatan</Label>
                                    <Input
                                        id="position"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        placeholder="Contoh: Kasubbag Perlengkapan"
                                        className="mt-1"
                                    />
                                    {errors.position && <p className="text-xs text-rose-500 mt-1">{errors.position}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="golongan">Golongan / Pangkat</Label>
                                    <Input
                                        id="golongan"
                                        value={data.golongan}
                                        onChange={(e) => setData('golongan', e.target.value)}
                                        placeholder="Contoh: III/c"
                                        className="mt-1"
                                    />
                                    {errors.golongan && <p className="text-xs text-rose-500 mt-1">{errors.golongan}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="perangkat_daerah_id">Perangkat Daerah (Instansi)</Label>
                                <select
                                    id="perangkat_daerah_id"
                                    value={data.perangkat_daerah_id}
                                    onChange={(e) => setData('perangkat_daerah_id', e.target.value)}
                                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1B84FF]"
                                >
                                    <option value="">-- Pilih Perangkat Daerah --</option>
                                    {perangkatDaerahs.map((pd) => (
                                        <option key={pd.id} value={pd.id}>{pd.name}</option>
                                    ))}
                                </select>
                                {errors.perangkat_daerah_id && <p className="text-xs text-rose-500 mt-1">{errors.perangkat_daerah_id}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <Button type="button" variant="secondary" onClick={closeModal}>Batal</Button>
                                <Button type="submit" variant="primary" disabled={processing}>
                                    {editingItem ? 'Simpan Perubahan' : 'Tambah Pegawai'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
