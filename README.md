

---

# Cara Menjalankan Proyek

Proyek ini terdiri dari dua bagian utama, yaitu backend (*be*) dan frontend (*fe*). Ikuti langkah-langkah berikut untuk menjalankan masing-masing bagian:

## 1. Backend (*be*)

### Persiapan
Pastikan Anda telah menginstal Go di komputer Anda. Jika belum, silakan kunjungi [Download Go](https://go.dev/dl/) untuk instalasi.

### Cara Menjalankan
1. Masuk ke direktori backend:
   ```bash
   $ cd be
   ```
2. Jalankan aplikasi:
   ```bash
   $ go run main.go
   ```

Aplikasi backend akan berjalan di server lokal. Pastikan tidak ada port konflik sebelum menjalankan aplikasi ini.

---

## 2. Frontend (*fe*)

### Persiapan
Pastikan Anda telah menginstal **Node.js** dan **npm**. Jika belum, silakan kunjungi [Node.js Download](https://nodejs.org/) untuk instalasi.

### Cara Menjalankan
1. Masuk ke direktori frontend:
   ```bash
   $ cd fe
   ```
2. Instal semua dependensi:
   ```bash
   $ npm install
   ```
3. Jalankan aplikasi frontend:
   ```bash
   $ npm run dev
   ```

Aplikasi frontend akan berjalan di mode pengembangan, biasanya di `http://localhost:3000`. Periksa terminal untuk detail lebih lanjut.

---

## Catatan Penting
- Pastikan backend sudah berjalan sebelum menjalankan frontend.
- Jika ada masalah saat menjalankan aplikasi, periksa kembali versi **Go**, **Node.js**, dan **npm** yang Anda gunakan.
- Untuk laporan bug atau kontribusi, silakan hubungi pengembang melalui email yang disediakan atau ajukan *issue* di repository ini.

---
