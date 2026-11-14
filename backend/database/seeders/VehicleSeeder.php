<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'police_number' => 'B 1234 ABC',
                'brand' => 'Toyota',
                'model' => 'Camry 2.5 V',
                'year' => 2022,
                'color' => 'Hitam Metalik',
                'condition' => 'Baik',
                'status' => 'Tersedia',
            ],
            [
                'police_number' => 'B 5678 DEF',
                'brand' => 'Toyota',
                'model' => 'Hilux Double Cabin',
                'year' => 2021,
                'color' => 'Putih',
                'condition' => 'Baik',
                'status' => 'Dipinjam',
            ],
            [
                'police_number' => 'B 9012 GHI',
                'brand' => 'Honda',
                'model' => 'CR-V 1.5 Turbo',
                'year' => 2020,
                'color' => 'Silver Metalik',
                'condition' => 'Rusak Ringan',
                'status' => 'Perawatan',
            ],
            [
                'police_number' => 'B 3456 JKL',
                'brand' => 'Mitsubishi',
                'model' => 'Pajero Sport',
                'year' => 2019,
                'color' => 'Hitam',
                'condition' => 'Baik',
                'status' => 'Tersedia',
            ],
            [
                'police_number' => 'B 7890 MNO',
                'brand' => 'Suzuki',
                'model' => 'APV Arena',
                'year' => 2018,
                'color' => 'Grey',
                'condition' => 'Rusak Berat',
                'status' => 'Non-Aktif',
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::firstOrCreate(['police_number' => $vehicle['police_number']], $vehicle);
        }
    }
}

