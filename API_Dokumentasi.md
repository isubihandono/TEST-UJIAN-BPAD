# Dokumentasi REST API - Aplikasi Pengelolaan Kendaraan Dinas Operasional (KDO)

Dokumentasi ini mencakup daftar endpoint REST API yang disediakan oleh backend Laravel untuk diintegrasikan ke aplikasi mobile **Flutter** (Android/iOS).

---

## 🌐 Base URL & Konvensi Umum

- **Base URL Development:** `http://10.0.2.2:8000/api/v1` (untuk Android Emulator) atau `http://localhost:8000/api/v1`
- **Content-Type:** `application/json`
- **Accept:** `application/json`

### Format Standard Response
#### Success Response (`200 OK` / `201 Created`)
```json
{
  "success": true,
  "message": "Deskripsi pesan sukses",
  "data": { ... } // atau Array [...]
}
```

#### Validation Error / Bad Request (`422 Unprocessable Entity`)
```json
{
  "message": "The police number has already been taken.",
  "errors": {
    "police_number": [
      "The police number has already been taken."
    ]
  }
}
```

---

## 🏢 1. Perangkat Daerah (PD) API

### A. List Perangkat Daerah
- **Endpoint:** `GET /perangkat-daerah`
- **Query Parameters (Opsional):**
  - `search`: Kata kunci pencarian nama / kode instansi.
- **Response Data:** Array objek Perangkat Daerah beserta jumlah pegawai (`employees_count`).

### B. Tambah Perangkat Daerah
- **Endpoint:** `POST /perangkat-daerah`
- **Request Body:**
  ```json
  {
    "name": "Dinas Pekerjaan Umum dan Penataan Ruang (PUPR)",
    "code": "PUPR-01",
    "address": "Jl. Merdeka No. 10",
    "phone": "021-5551234"
  }
  ```

### C. Detail Perangkat Daerah
- **Endpoint:** `GET /perangkat-daerah/{id}`
- **Response Data:** Objek Perangkat Daerah beserta relasi pegawai (`employees`) dan kendaraan (`vehicles`).

### D. Update Perangkat Daerah
- **Endpoint:** `PUT /perangkat-daerah/{id}`
- **Request Body:** Sama seperti `POST`.

### E. Hapus Perangkat Daerah
- **Endpoint:** `DELETE /perangkat-daerah/{id}`

---

## 👨‍💼 2. Pegawai Negeri Sipil (PNS) API

### A. List Pegawai
- **Endpoint:** `GET /employees`
- **Query Parameters (Opsional):**
  - `search`: Pencarian nama, NIP, atau jabatan.
  - `perangkat_daerah_id`: Filter berdasarkan ID instansi.
- **Response Data:** Array objek Pegawai beserta relasi Perangkat Daerah dan Kendaraan.

### B. Tambah Pegawai
- **Endpoint:** `POST /employees`
- **Request Body:**
  ```json
  {
    "name": "Budi Santoso, S.T.",
    "nip": "198501012010011001",
    "position": "Kepala Sub Bagian Perlengkapan",
    "golongan": "III/c",
    "perangkat_daerah_id": 1
  }
  ```

### C. Detail Pegawai
- **Endpoint:** `GET /employees/{id}`

### D. Update Pegawai
- **Endpoint:** `PUT /employees/{id}`
- **Request Body:** Sama seperti `POST`.

### E. Hapus Pegawai
- **Endpoint:** `DELETE /employees/{id}`

---

## 🚗 3. Kendaraan Dinas Operasional (KDO) API

### A. List Kendaraan Dinas
- **Endpoint:** `GET /vehicles`
- **Query Parameters (Opsional):**
  - `search`: Pencarian nomor polisi, merk, atau model.
  - `condition`: Filter kondisi kendaraan (`Baik`, `Rusak Ringan`, `Rusak Berat`).
- **Response Data:** Array objek Kendaraan beserta penanggung jawab (`employee`) dan perangkat daerahnya.

### B. Tambah Kendaraan Dinas
- **Endpoint:** `POST /vehicles`
- **Request Body:**
  ```json
  {
    "police_number": "B 1234 ABC",
    "brand": "Toyota",
    "model": "Avanza",
    "year": 2022,
    "color": "Hitam Metalik",
    "condition": "Baik",
    "status": "Aktif Operasional",
    "employee_id": 1
  }
  ```

### C. Detail Kendaraan
- **Endpoint:** `GET /vehicles/{id}`

### D. Update Kendaraan
- **Endpoint:** `PUT /vehicles/{id}`
- **Request Body:** Sama seperti `POST`.

### E. Hapus Kendaraan
- **Endpoint:** `DELETE /vehicles/{id}`

---

## 📱 Contoh Service Flutter (HTTP)

Berikut adalah contoh implementasi service di Flutter untuk mengambil data Kendaraan Dinas (KDO):

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class KdoApiService {
  // Gunakan 10.0.2.2 untuk Android Emulator, atau IP lokal komputer untuk HP fisik
  static const String baseUrl = 'http://10.0.2.2:8000/api/v1';

  static Future<List<dynamic>> getVehicles() async {
    final response = await http.get(
      Uri.parse('$baseUrl/vehicles'),
      headers: {'Accept': 'application/json'},
    );

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      return jsonResponse['data'];
    } else {
      throw Exception('Gagal memuat data kendaraan: ${response.reasonPhrase}');
    }
  }

  static Future<bool> storeVehicle(Map<String, dynamic> vehicleData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/vehicles'),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: json.encode(vehicleData),
    );

    return response.statusCode == 201;
  }
}
```
