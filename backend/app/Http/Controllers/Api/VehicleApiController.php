<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Vehicle::query()->with('employee.perangkatDaerah');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('police_number', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%");
        }

        if ($request->has('condition')) {
            $query->where('condition', $request->input('condition'));
        }

        $vehicles = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'List Kendaraan Dinas Operasional (KDO)',
            'data' => $vehicles,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'police_number' => ['required', 'string', 'max:20', 'unique:vehicles,police_number'],
            'brand' => ['required', 'string', 'max:50'],
            'model' => ['required', 'string', 'max:50'],
            'year' => ['required', 'integer', 'min:1990', 'max:' . (date('Y') + 1)],
            'color' => ['required', 'string', 'max:30'],
            'condition' => ['required', 'in:Baik,Rusak Ringan,Rusak Berat'],
            'status' => ['required', 'string', 'max:30'],
            'employee_id' => ['nullable', 'exists:employees,id'],
        ]);

        $vehicle = Vehicle::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Kendaraan berhasil ditambahkan',
            'data' => $vehicle->load('employee.perangkatDaerah'),
        ], 201);
    }

    public function show(Vehicle $vehicle): JsonResponse
    {
        $vehicle->load('employee.perangkatDaerah');

        return response()->json([
            'success' => true,
            'message' => 'Detail Kendaraan',
            'data' => $vehicle,
        ]);
    }

    public function update(Request $request, Vehicle $vehicle): JsonResponse
    {
        $validated = $request->validate([
            'police_number' => ['required', 'string', 'max:20', 'unique:vehicles,police_number,' . $vehicle->id],
            'brand' => ['required', 'string', 'max:50'],
            'model' => ['required', 'string', 'max:50'],
            'year' => ['required', 'integer', 'min:1990', 'max:' . (date('Y') + 1)],
            'color' => ['required', 'string', 'max:30'],
            'condition' => ['required', 'in:Baik,Rusak Ringan,Rusak Berat'],
            'status' => ['required', 'string', 'max:30'],
            'employee_id' => ['nullable', 'exists:employees,id'],
        ]);

        $vehicle->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Kendaraan berhasil diperbarui',
            'data' => $vehicle->load('employee.perangkatDaerah'),
        ]);
    }

    public function destroy(Vehicle $vehicle): JsonResponse
    {
        $vehicle->delete();

        return response()->json([
            'success' => true,
            'message' => 'Kendaraan berhasil dihapus',
        ]);
    }
}
