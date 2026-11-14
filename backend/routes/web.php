<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PerangkatDaerahController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

// Redirect root to dashboard if authenticated, else login
Route::get('/', function () {
    return auth()->check() ? redirect()->route('dashboard') : redirect()->route('login');
});

// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('vehicles', VehicleController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('perangkat-daerah', PerangkatDaerahController::class);
    Route::resource('users', UserController::class);
    Route::resource('bookings', BookingController::class);
    Route::resource('maintenances', MaintenanceController::class);
    Route::resource('roles', RoleController::class);
});
