<?php

namespace App\Http\Controllers;

use App\Models\PerangkatDaerah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PerangkatDaerahController extends Controller
{
    /**
     * Tampilkan daftar Perangkat Daerah (PD).
     */
    public function index(Request $request): Response
    {
        $query = PerangkatDaerah::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
        }

        $perangkatDaerahs = $query->withCount('employees')->latest()->paginate(10)->withQueryString();

        return Inertia::render('PerangkatDaerah/Index', [
            'perangkatDaerahs' => $perangkatDaerahs,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Simpan data Perangkat Daerah baru.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150', 'unique:perangkat_daerahs,name'],
            'code' => ['required', 'string', 'max:50', 'unique:perangkat_daerahs,code'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        PerangkatDaerah::create($validated);

        return redirect()->route('perangkat-daerah.index')->with('success', 'Data Perangkat Daerah berhasil ditambahkan.');
    }

    /**
     * Update data Perangkat Daerah.
     */
    public function update(Request $request, PerangkatDaerah $perangkatDaerah): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150', 'unique:perangkat_daerahs,name,' . $perangkatDaerah->id],
            'code' => ['required', 'string', 'max:50', 'unique:perangkat_daerahs,code,' . $perangkatDaerah->id],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        $perangkatDaerah->update($validated);

        return redirect()->route('perangkat-daerah.index')->with('success', 'Data Perangkat Daerah berhasil diperbarui.');
    }

    /**
     * Hapus data Perangkat Daerah.
     */
    public function destroy(PerangkatDaerah $perangkatDaerah): RedirectResponse
    {
        $perangkatDaerah->delete();

        return redirect()->route('perangkat-daerah.index')->with('success', 'Data Perangkat Daerah berhasil dihapus.');
    }
}
