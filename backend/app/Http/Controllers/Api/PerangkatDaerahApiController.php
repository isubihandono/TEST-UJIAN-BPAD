<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PerangkatDaerah;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PerangkatDaerahApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = PerangkatDaerah::query()->withCount('employees');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
        }

        $perangkatDaerahs = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'List Perangkat Daerah',
            'data' => $perangkatDaerahs,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150', 'unique:perangkat_daerahs,name'],
            'code' => ['required', 'string', 'max:50', 'unique:perangkat_daerahs,code'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        $perangkatDaerah = PerangkatDaerah::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Perangkat Daerah berhasil ditambahkan',
            'data' => $perangkatDaerah,
        ], 201);
    }

    public function show(PerangkatDaerah $perangkatDaerah): JsonResponse
    {
        $perangkatDaerah->load('employees.vehicles');

        return response()->json([
            'success' => true,
            'message' => 'Detail Perangkat Daerah',
            'data' => $perangkatDaerah,
        ]);
    }

    public function update(Request $request, PerangkatDaerah $perangkatDaerah): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150', 'unique:perangkat_daerahs,name,' . $perangkatDaerah->id],
            'code' => ['required', 'string', 'max:50', 'unique:perangkat_daerahs,code,' . $perangkatDaerah->id],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        $perangkatDaerah->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Perangkat Daerah berhasil diperbarui',
            'data' => $perangkatDaerah,
        ]);
    }

    public function destroy(PerangkatDaerah $perangkatDaerah): JsonResponse
    {
        $perangkatDaerah->delete();

        return response()->json([
            'success' => true,
            'message' => 'Perangkat Daerah berhasil dihapus',
        ]);
    }
}
