<?php

use App\Http\Controllers\Api\PerangkatDaerahApiController;
use App\Http\Controllers\Api\EmployeeApiController;
use App\Http\Controllers\Api\VehicleApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Perangkat Daerah (PD) API
    Route::apiResource('perangkat-daerah', PerangkatDaerahApiController::class);

    // Pegawai Negeri Sipil (PNS) API
    Route::apiResource('employees', EmployeeApiController::class);

    // Kendaraan Dinas Operasional (KDO) API
    Route::apiResource('vehicles', VehicleApiController::class);
});
