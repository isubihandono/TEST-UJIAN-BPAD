<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Maintenance::query()->with('vehicle');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('description', 'like', "%{$search}%")
                  ->orWhere('workshop', 'like', "%{$search}%")
                  ->orWhereHas('vehicle', fn($q) => $q->where('police_number', 'like', "%{$search}%"));
        }

        $maintenances = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Maintenances/Index', [
            'maintenances' => $maintenances,
            'vehicles' => Vehicle::all(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'service_date' => ['required', 'date'],
            'description' => ['required', 'string'],
            'cost' => ['required', 'numeric', 'min:0'],
            'workshop' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:Proses,Selesai'],
        ]);

        Maintenance::create($validated);

        return redirect()->route('maintenances.index')->with('success', 'Data perawatan kendaraan berhasil ditambahkan.');
    }

    public function update(Request $request, Maintenance $maintenance): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'service_date' => ['required', 'date'],
            'description' => ['required', 'string'],
            'cost' => ['required', 'numeric', 'min:0'],
            'workshop' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:Proses,Selesai'],
        ]);

        $maintenance->update($validated);

        return redirect()->route('maintenances.index')->with('success', 'Data perawatan kendaraan berhasil diperbarui.');
    }

    public function destroy(Maintenance $maintenance): RedirectResponse
    {
        $maintenance->delete();

        return redirect()->route('maintenances.index')->with('success', 'Data perawatan kendaraan berhasil dihapus.');
    }
}
