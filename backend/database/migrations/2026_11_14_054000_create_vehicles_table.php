<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('police_number')->unique(); // Nomor Polisi Kendaraan
            $table->string('brand'); // Merk Kendaraan
            $table->string('model'); // Tipe atau Model Kendaraan
            $table->year('year'); // Tahun Produksi
            $table->string('color'); // Warna Kendaraan
            $table->enum('condition', ['Baik', 'Rusak Ringan', 'Rusak Berat'])->default('Baik'); // Kondisi / Status Kondisi
            $table->string('status')->default('Tersedia'); // Status Operasional (Tersedia, Dipinjam, Perawatan)
            $table->foreignId('employee_id')->nullable()->constrained('employees')->nullOnDelete(); // Penanggung Jawab PNS
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
