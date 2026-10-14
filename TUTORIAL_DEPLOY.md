# Panduan Deploy Manual ke Fly.io

Tutorial ini menjelaskan langkah-langkah untuk melakukan pembaruan (update/deploy) website Laravel kamu ke server **Fly.io** jika sewaktu-waktu kamu melakukan perubahan kode (seperti menambah fitur, memperbaiki bug, atau mengubah teks).

---

## Prasyarat
Sebelum mulai, pastikan kamu berada di dalam folder proyek kamu melalui terminal (Command Prompt / PowerShell).
- Lokasi folder: `d:\Project AI Anti\Educational-Web-Portal-master`

---

## Langkah 1: Pastikan Kode Sudah Tersimpan
Pastikan semua perubahan kode (PHP, Vue/React, CSS) sudah di-*save*. 
Jika kamu menggunakan Vite, kamu **tidak perlu** menjalankan `npm run build` secara manual karena server (melalui file `Dockerfile`) sudah diatur untuk otomatis mem-build aset frontend setiap kali aplikasi di-deploy.

---

## Langkah 2: Buka Terminal (PowerShell / CMD)
Buka terminal dan arahkan ke dalam folder proyek kamu:
```bash
cd "d:\Project AI Anti\Educational-Web-Portal-master"
```
*(Jika kamu menggunakan terminal bawaan VS Code, biasanya otomatis sudah berada di folder ini).*

---

## Langkah 3: Jalankan Perintah Deploy
Ketik perintah berikut di terminal kamu lalu tekan Enter:

```bash
.\fly_bin\flyctl.exe deploy --ha=false
```

**Penjelasan Perintah:**
- `.\fly_bin\flyctl.exe` : Adalah program CLI resmi dari Fly.io yang sudah kita download di foldermu.
- `deploy` : Perintah untuk membungkus kode baru dan mengirimkannya ke server.
- `--ha=false` : Menginstruksikan Fly.io untuk hanya menggunakan 1 mesin (karena akun gratis tidak mengizinkan lebih dari 2 mesin untuk High Availability / HA).

---

## Langkah 4: Tunggu Proses Selesai
Proses ini biasanya memakan waktu **2 - 4 menit**, bergantung pada ukuran proyekmu dan kecepatan internet.

Server Fly.io akan melakukan:
1. Membaca `Dockerfile`.
2. Mendownload dan menginstall dependencies PHP (`composer install`).
3. Mendownload dan menginstall Node.js dependencies (`npm install`).
4. Mem-build aset frontend (`npm run build`).
5. Memulai ulang mesin virtual kamu dengan kode yang baru.

**Tanda Berhasil:**
Kamu akan melihat tulisan:
`Visit your newly deployed app at https://educational-web-portal-master.fly.dev/`

---

## Tips & Troubleshooting ⚠️

- **Bagaimana jika database butuh di-update (Migration)?**
  File Docker kita sudah diprogram agar secara otomatis menjalankan `php artisan migrate --force` setiap kali server restart. Jadi kamu cukup menjalankan perintah deploy di Langkah 3, dan database akan di-update otomatis.

- **Melihat Log (Jika ada Error / Layar Putih)**
  Jika web tidak mau terbuka atau terjadi error 502, kamu bisa melihat catatan error langsung dari server dengan perintah:
  ```bash
  .\fly_bin\flyctl.exe logs
  ```
  *(Tekan `Ctrl + C` untuk keluar dari layar log).*

- **File Penting Terkait Server:**
  - `fly.toml`: Berisi konfigurasi nama app, pengaturan port HTTP (8080), dan volume database.
  - `Dockerfile`: Berisi resep/cara server menginstal dan menyalakan aplikasimu.
  - `.dockerignore`: Daftar file yang tidak dikirim ke server (seperti folder `vendor` dan `node_modules`).
