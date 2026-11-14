# Aplikasi Pengelolaan Kendaraan Dinas Operasional (KDO)

> Aplikasi untuk mengelola data kendaraan dinas operasional (KDO) milik perangkat daerah sebagai bagian dari pengelolaan barang milik daerah (BMD). Aplikasi ini bertujuan membantu proses pendataan kendaraan dinas, guna mengetahui kondisi kendaraan serta mencatat pegawai yang bertanggung jawab atas penggunaannya.

---
🤖 **Dibuat oleh:** Sob AI dari Android Studio (Powered by Gemini)  
🛠️ **Teknologi Utama:** 
- **Backend:** Laravel 11.x (PHP 8.4) + `spatie/laravel-permission`
- **Frontend:** React 19.x + Vite
- **Perantara:** Inertia.js v2
- **Styling & UI:** Tailwind CSS v4 & Metronic Theme v9

---

Dokumen ini merupakan Kerangka Acuan Kerja (KAK) dan acuan arsitektur pengembangan aplikasi **Kelola Kendaraan Dinas Operasional (KDO)**.

---

## 🏗️ 1. Arsitektur & Struktur Folder Project

Aplikasi dibangun menggunakan arsitektur **Monolith Terpisah via Inertia.js**, mengombinasikan ketangguhan Laravel di backend dan modernitas React di frontend.

- **`backend/` (Laravel - PHP 8.4)**
  - Fokus utama: Manajemen Database, Migrations, Seeders, Eloquent Models, Business Logic, dan Autentikasi/RBAC.
  - Package utama: `spatie/laravel-permission` untuk pengeloaan Role & Permission.
  - Bertindak sebagai penyedia response Inertia (`Inertia::render()`) serta proteksi Middleware.

- **`frontend/` (React - Vite)**
  - Fokus utama: Tampilan antarmuka pengguna (UI/UX).
  - Mengadopsi aset, styling, dan komponen dari **Metronic Theme v9** (folder `Theme/`).
  - Menggunakan Inertia React Adapter untuk render halaman secara seamless tanpa REST API terpisah.

- **`Theme/` (Metronic v9 Kit)**
  - Sumber komponen UI React/Tailwind dari Metronic.

---

## 🔑 2. Kerangka Kerja Tahap Awal: Sistem Login & RBAC

### A. Autentikasi (Authentication)
1. Halaman Login berbasis tema Metronic.
2. Proses verifikasi kredensial via Laravel Auth (`web` guard / session).
3. Proteksi route dan redirect otomatis ke Dashboard sesuai role.

### B. Role-Based Access Control (RBAC)
Menggunakan `spatie/laravel-permission` dengan peran/role berikut:
1. **Super Admin**: Akses penuh ke seluruh fitur sistem dan manajemen user/role.
2. **Admin KDO**: Mengelola data kendaraan dinas, penanggung jawab, instansi, dan alokasi.
3. **Pejabat / Penyetuju**: Memiliki wewenang menyetujui (Approve/Reject) permohonan penggunaan kendaraan.
4. **Driver / Pengemudi**: Melihat tugas operasional dan memperbarui status perjalanan/kendaraan.
5. **Pegawai / Pemohon**: Mengajukan permohonan peminjaman kendaraan dinas operasional.

---

## 🚗 3. Tiga Entitas Utama Pengelolaan KDO

Dalam pengelolaan Kendaraan Dinas Operasional (KDO) pada aplikasi ini, terdapat 3 entitas utama sistem yang saling berelasi:

### 1. Kendaraan Dinas Operasional (KDO)
Data kendaraan dinas yang meliputi atribut:
- **Nomer Polisi Kendaraan** (`police_number`)
- **Merk Kendaraan** (`brand`)
- **Tipe atau Model Kendaraan** (`model`)
- **Tahun Produksi** (`year`)
- **Warna Kendaraan** (`color`)
- **Kondisi atau Status Kendaraan**: 
  - *Baik*
  - *Rusak Ringan*
  - *Rusak Berat*

### 2. Pegawai Negeri Sipil (PNS)
Data pegawai yang menjadi penanggung jawab kendaraan, meliputi atribut:
- **Nama Pegawai** (`name`)
- **NIP** (`nip`)
- **Jabatan** (`position`)
- **Golongan** (`golongan`)

### 3. Perangkat Daerah (PD)
Data instansi yang menggunakan atau memiliki kendaraan dinas, mencakup contoh instansi seperti:
- **Dinas Pendidikan**
- **Dinas Kesehatan**
- **Dinas Pekerjaan Umum dan Penataan Ruang (PUPR)**
- Serta instansi/perangkat daerah lainnya.

---

## 🚀 4. Panduan Jalankan Aplikasi

### Backend (Laravel)
```bash
cd backend
composer install
php artisan migrate --seed
php artisan serve
```

### Frontend (React + Inertia)
```bash
npm install
npm run dev
```

---

*Dokumen ini akan terus diperbarui seiring berjalannya pengembangan modul KDO.*
