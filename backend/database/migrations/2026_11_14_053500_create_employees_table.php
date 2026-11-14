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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama Pegawai
            $table->string('nip')->unique(); // NIP
            $table->string('position'); // Jabatan
            $table->string('golongan'); // Golongan
            $table->foreignId('perangkat_daerah_id')->nullable()->constrained('perangkat_daerahs')->nullOnDelete(); // Instansi / PD
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
