# Dokumentasi Struktur Database - Aplikasi Pengelolaan Kendaraan Dinas Operasional (KDO)

Dokumentasi ini menjelaskan rancangan dan skema database relasional yang digunakan dalam sistem pengelolaan Kendaraan Dinas Operasional (KDO), Pegawai Negeri Sipil (PNS), dan Perangkat Daerah (PD).

---

## 📊 ERD / Relasi Antar Tabel

```
PerangkatDaerah (1) --------< (N) Employee (PNS) (1) --------< (N) Vehicle (KDO)
```

- **PerangkatDaerah** memiliki banyak **Employee**.
- **Employee (PNS)** dapat bertanggung jawab atas satu atau banyak **Vehicle (KDO)**.

---

## 📑 Daftar Tabel dan Penjelasannya

### 1. Tabel `perangkat_daerahs` (Perangkat Daerah / PD)
Menyimpan data instansi pemerintah / satuan kerja perangkat daerah (SKPD) yang memiliki atau menggunakan kendaraan dinas.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BigIncrements | Primary Key |
| `name` | VARCHAR (Unique) | Nama Perangkat Daerah (Contoh: Dinas Pendidikan, Dinas Kesehatan, Dinas PUPR) |
| `code` | VARCHAR (Unique) | Kode unik instansi / SKPD |
| `address` | TEXT (Nullable) | Alamat kantor Perangkat Daerah |
| `phone` | VARCHAR (Nullable) | Nomor telepon instansi |
| `created_at` / `updated_at` | Timestamp | Waktu pencatatan & pembaruan data |

---

### 2. Tabel `employees` (Pegawai Negeri Sipil / PNS)
Menyimpan data pegawai yang bertindak sebagai penanggung jawab atau pemegang kendaraan dinas operasional.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BigIncrements | Primary Key |
| `name` | VARCHAR | Nama lengkap pegawai beserta gelar |
| `nip` | VARCHAR (Unique) | Nomor Induk Pegawai (NIP) |
| `position` | VARCHAR | Jabatan struktural / fungsional pegawai |
| `golongan` | VARCHAR | Pangkat / Golongan PNS (Contoh: III/a, III/c, IV/a) |
| `perangkat_daerah_id` | Foreign Key (`perangkat_daerahs.id`) | Relasi ke instansi tempat pegawai bekerja |
| `created_at` / `updated_at` | Timestamp | Waktu pencatatan & pembaruan data |

---

### 3. Tabel `vehicles` (Kendaraan Dinas Operasional / KDO)
Menyimpan inventaris kendaraan dinas operasional milik perangkat daerah.

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BigIncrements | Primary Key |
| `police_number` | VARCHAR (Unique) | Nomor polisi kendaraan (Plat nomor) |
| `brand` | VARCHAR | Merk kendaraan (Contoh: Toyota, Honda, Mitsubishi) |
| `model` | VARCHAR | Tipe atau model kendaraan (Contoh: Avanza, Hilux, CR-V) |
| `year` | YEAR | Tahun produksi kendaraan |
| `color` | VARCHAR | Warna kendaraan |
| `condition` | ENUM (`Baik`, `Rusak Ringan`, `Rusak Berat`) | Status kondisi fisik kendaraan |
| `status` | VARCHAR | Status operasional kendaraan (Contoh: Tersedia, Dipinjam, Perawatan) |
| `employee_id` | Foreign Key (`employees.id`, Nullable) | Pegawai PNS penanggung jawab kendaraan |
| `created_at` / `updated_at` | Timestamp | Waktu pencatatan & pembaruan data |

---

### 4. Tabel Pendukung Sistem (Autentikasi & RBAC)

#### A. Tabel `users`
Menyimpan akun pengguna web dan mobile yang dapat mengakses sistem (Admin KDO, Pejabat, Operator, dll).

| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BigIncrements | Primary Key |
| `name` | VARCHAR | Nama pengguna sistem |
| `email` | VARCHAR (Unique) | Email untuk login |
| `password` | VARCHAR | Password terenkripsi (bcrypt) |
| `created_at` / `updated_at` | Timestamp | Waktu pencatatan data |

#### B. Tabel `roles` & `permissions` (Spatie Permission)
Mengatur hak akses peran pengguna (Super Admin, Admin KDO, Pejabat Penyetuju, Driver, Pegawai).
- `roles`: Menyimpan nama role.
- `permissions`: Menyimpan daftar hak akses fitur.
- `model_has_roles` / `role_has_permissions`: Tabel pivot relasi role dan user/permission.
