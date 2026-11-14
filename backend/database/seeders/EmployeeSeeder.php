<?php

namespace Database\Seeders;

use App\Models\PerangkatDaerah;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Perangkat Daerah
        $pd1 = PerangkatDaerah::firstOrCreate(
            ['code' => 'DIN-DIK'],
            [
                'name' => 'Dinas Pendidikan',
                'address' => 'Jl. Pemuda No. 12, Kota',
                'phone' => '021-5550101'
            ]
        );

        $pd2 = PerangkatDaerah::firstOrCreate(
            ['code' => 'DIN-KES'],
            [
                'name' => 'Dinas Kesehatan',
                'address' => 'Jl. Kesehatan No. 45, Kota',
                'phone' => '021-5550202'
            ]
        );

        $pd3 = PerangkatDaerah::firstOrCreate(
            ['code' => 'DIN-PUPR'],
            [
                'name' => 'Dinas Pekerjaan Umum dan Penataan Ruang (PUPR)',
                'address' => 'Jl. Pembangunan No. 88, Kota',
                'phone' => '021-5550303'
            ]
        );

        // 2. 10 Dummy Employees
        $employees = [
            // Dinas Pendidikan (4 orang)
            [
                'name' => 'Dr. H. Ahmad Fauzi, M.Pd.',
                'nip' => '196805121992031001',
                'position' => 'Kepala Dinas Pendidikan',
                'golongan' => 'IV/d',
                'perangkat_daerah_id' => $pd1->id,
            ],
            [
                'name' => 'Dra. Hj. Siti Aminah, M.Si.',
                'nip' => '197208151998032002',
                'position' => 'Sekretaris Dinas',
                'golongan' => 'IV/c',
                'perangkat_daerah_id' => $pd1->id,
            ],
            [
                'name' => 'Budi Santoso, S.T.',
                'nip' => '198103202005011003',
                'position' => 'Kepala Bidang Pembinaan SMP',
                'golongan' => 'IV/a',
                'perangkat_daerah_id' => $pd1->id,
            ],
            [
                'name' => 'Dewi Lestari, S.Pd.',
                'nip' => '198811052011012004',
                'position' => 'Bendahara Pengeluaran',
                'golongan' => 'III/c',
                'perangkat_daerah_id' => $pd1->id,
            ],

            // Dinas Kesehatan (3 orang)
            [
                'name' => 'dr. H. Rahmat Hidayat, M.Kes.',
                'nip' => '197002102000121005',
                'position' => 'Kepala Dinas Kesehatan',
                'golongan' => 'IV/d',
                'perangkat_daerah_id' => $pd2->id,
            ],
            [
                'name' => 'Ns. Ratna Sari, S.Kep.',
                'nip' => '198304182009022006',
                'position' => 'Kasubbag Kepegawaian',
                'golongan' => 'III/d',
                'perangkat_daerah_id' => $pd2->id,
            ],
            [
                'name' => 'Eko Prasetyo, SKM',
                'nip' => '199007222015031007',
                'position' => 'Staf Bidang Pencegahan & Pengendalian Penyakit',
                'golongan' => 'III/b',
                'perangkat_daerah_id' => $pd2->id,
            ],

            // Dinas PUPR (3 orang)
            [
                'name' => 'Ir. H. Joko Widodo, M.T.',
                'nip' => '196711301991031008',
                'position' => 'Kepala Dinas PUPR',
                'golongan' => 'IV/e',
                'perangkat_daerah_id' => $pd3->id,
            ],
            [
                'name' => 'Rini Handayani, S.T., M.Sc.',
                'nip' => '198509122010012009',
                'position' => 'Kabid Tata Ruang dan Pertanahan',
                'golongan' => 'IV/a',
                'perangkat_daerah_id' => $pd3->id,
            ],
            [
                'name' => 'Agus Setiawan, S.T.',
                'nip' => '199201152018021010',
                'position' => 'Pengawas Jaringan Jalan dan Jembatan',
                'golongan' => 'III/a',
                'perangkat_daerah_id' => $pd3->id,
            ],
        ];

        foreach ($employees as $emp) {
            Employee::firstOrCreate(['nip' => $emp['nip']], $emp);
        }
    }
}
