<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    /**
     * Tampilkan daftar kendaraan KDO.
     */
    public function index(Request $request): Response
    {
        $query = Vehicle::query()->with('employee');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('police_number', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%");
        }

        $vehicles = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'employees' => Employee::all(),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Simpan data kendaraan baru.
     */
    public function store(Request $request): RedirectResponse
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

        Vehicle::create($validated);

        return redirect()->route('vehicles.index')->with('success', 'Data kendaraan berhasil ditambahkan.');
    }

    /**
     * Update data kendaraan.
     */
    public function update(Request $request, Vehicle $vehicle): RedirectResponse
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

        return redirect()->route('vehicles.index')->with('success', 'Data kendaraan berhasil diperbarui.');
    }

    /**
     * Hapus data kendaraan.
     */
    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $vehicle->delete();

        return redirect()->route('vehicles.index')->with('success', 'Data kendaraan berhasil dihapus.');
    }
}
