<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\PerangkatDaerah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * Tampilkan daftar pegawai (PNS).
     */
    public function index(Request $request): Response
    {
        $query = Employee::query()->with('perangkatDaerah');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('nip', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%");
        }

        $employees = $query->withCount('vehicles')->latest()->paginate(10)->withQueryString();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'perangkatDaerahs' => PerangkatDaerah::all(),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Simpan data pegawai baru.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'nip' => ['required', 'string', 'max:30', 'unique:employees,nip'],
            'position' => ['required', 'string', 'max:100'],
            'golongan' => ['required', 'string', 'max:20'],
            'perangkat_daerah_id' => ['nullable', 'exists:perangkat_daerahs,id'],
        ]);

        Employee::create($validated);

        return redirect()->route('employees.index')->with('success', 'Data pegawai berhasil ditambahkan.');
    }

    /**
     * Update data pegawai.
     */
    public function update(Request $request, Employee $employee): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'nip' => ['required', 'string', 'max:30', 'unique:employees,nip,' . $employee->id],
            'position' => ['required', 'string', 'max:100'],
            'golongan' => ['required', 'string', 'max:20'],
            'perangkat_daerah_id' => ['nullable', 'exists:perangkat_daerahs,id'],
        ]);

        $employee->update($validated);

        return redirect()->route('employees.index')->with('success', 'Data pegawai berhasil diperbarui.');
    }

    /**
     * Hapus data pegawai.
     */
    public function destroy(Employee $employee): RedirectResponse
    {
        $employee->delete();

        return redirect()->route('employees.index')->with('success', 'Data pegawai berhasil dihapus.');
    }
}
