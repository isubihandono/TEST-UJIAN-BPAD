<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Vehicle;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Booking::query()->with(['vehicle', 'employee']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('purpose', 'like', "%{$search}%")
                  ->orWhereHas('vehicle', fn($q) => $q->where('police_number', 'like', "%{$search}%"))
                  ->orWhereHas('employee', fn($q) => $q->where('name', 'like', "%{$search}%"));
        }

        $bookings = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'vehicles' => Vehicle::all(),
            'employees' => Employee::all(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'employee_id' => ['required', 'exists:employees,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'purpose' => ['required', 'string'],
            'status' => ['required', 'in:Pending,Disetujui,Ditolak,Selesai'],
        ]);

        Booking::create($validated);

        return redirect()->route('bookings.index')->with('success', 'Data peminjaman KDO berhasil ditambahkan.');
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'employee_id' => ['required', 'exists:employees,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'purpose' => ['required', 'string'],
            'status' => ['required', 'in:Pending,Disetujui,Ditolak,Selesai'],
        ]);

        $booking->update($validated);

        return redirect()->route('bookings.index')->with('success', 'Data peminjaman KDO berhasil diperbarui.');
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();

        return redirect()->route('bookings.index')->with('success', 'Data peminjaman KDO berhasil dihapus.');
    }
}
