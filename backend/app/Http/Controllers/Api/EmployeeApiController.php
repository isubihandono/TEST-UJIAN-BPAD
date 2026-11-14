<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Employee::query()->with(['perangkatDaerah', 'vehicles']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('nip', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%");
        }

        if ($request->has('perangkat_daerah_id')) {
            $query->where('perangkat_daerah_id', $request->input('perangkat_daerah_id'));
        }

        $employees = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'List Pegawai (PNS)',
            'data' => $employees,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'nip' => ['required', 'string', 'max:30', 'unique:employees,nip'],
            'position' => ['required', 'string', 'max:100'],
            'golongan' => ['required', 'string', 'max:20'],
            'perangkat_daerah_id' => ['nullable', 'exists:perangkat_daerahs,id'],
        ]);

        $employee = Employee::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pegawai berhasil ditambahkan',
            'data' => $employee->load('perangkatDaerah'),
        ], 201);
    }

    public function show(Employee $employee): JsonResponse
    {
        $employee->load(['perangkatDaerah', 'vehicles']);

        return response()->json([
            'success' => true,
            'message' => 'Detail Pegawai',
            'data' => $employee,
        ]);
    }

    public function update(Request $request, Employee $employee): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'nip' => ['required', 'string', 'max:30', 'unique:employees,nip,' . $employee->id],
            'position' => ['required', 'string', 'max:100'],
            'golongan' => ['required', 'string', 'max:20'],
            'perangkat_daerah_id' => ['nullable', 'exists:perangkat_daerahs,id'],
        ]);

        $employee->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pegawai berhasil diperbarui',
            'data' => $employee->load('perangkatDaerah'),
        ]);
    }

    public function destroy(Employee $employee): JsonResponse
    {
        $employee->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pegawai berhasil dihapus',
        ]);
    }
}
