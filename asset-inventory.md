# Inventaris Aset (Asset Inventory) - E-Bidding Migas

Berikut adalah daftar aset data dan sistem pada platform E-Bidding Migas yang diperbarui sesuai dengan arsitektur produk yang berjalan.

## 1. Aset Data
Aset data yang dilindungi oleh komponen kriptografi ditandai dengan **[Kriptografi]**.

| ID | Nama Aset Data | Deskripsi | Kategori Kerahasiaan | Pemilik (Owner) |
| :--- | :--- | :--- | :--- | :--- |
| **D1** | **Nilai Penawaran (Bid Amount)** **[Kriptografi]** | Angka nominal penawaran tender yang diajukan oleh perusahaan peserta. | Sangat Rahasia (Confidential) | Peserta Bidding |
| **D2** | **Kredensial Pengguna (Password)** **[Kriptografi]** | Password untuk autentikasi masuk ke platform. Disimpan dalam bentuk Hash + Salt. | Sangat Rahasia (Confidential) | Pengguna |
| **D3** | **Dokumen Kontrak (WK/Logistik)** | Dokumen PDF/Word berisi spesifikasi tender, syarat, dan surat perjanjian pemenang. | Internal / Rahasia | Admin Penyelenggara |
| **D4** | **Data Profil Perusahaan** | Informasi nama PT, alamat, NPWP, dan kontak representatif perusahaan. | Internal | Peserta Bidding |
| **D5** | **Session Token/Cookie** | Token JWT/Cookie yang menandakan sesi aktif pengguna setelah login. | Sangat Rahasia (Confidential) | Sistem |

## 2. Aset Sistem (Infrastruktur & Komponen)

| ID | Nama Komponen Sistem | Deskripsi |
| :--- | :--- | :--- |
| **S1** | **Web Frontend (React)** | Antarmuka pengguna (UI) yang diakses peserta bidding melalui peramban (browser). |
| **S2** | **Backend API Server (Node.js)** | Server utama yang memproses logika bisnis, enkripsi penawaran, dan validasi akses. |
| **S3** | **Database Server** | Sistem manajemen basis data penyimpan seluruh data operasional (D1-D4). |