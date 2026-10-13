# E-Bidding Migas

Platform *Business-to-Business* (B2B) berbasis web untuk memfasilitasi sesi bidding/tender logistik, alat berat, dan wilayah kerja (WK) blok minyak dan gas bumi secara terintegrasi, transparan, dan aman.

## 1. Konsep Produk & Fitur Utama
* **Masalah yang Diselesaikan:** Mencegah kebocoran nilai penawaran antar kompetitor selama sesi bidding berlangsung, serta menyediakan platform tender terpusat.
* **Target Pengguna:** Perusahaan Kontraktor Kontrak Kerja Sama (KKKS), Penyedia Jasa Logistik & Alat Berat Migas.
* **Fitur Utama:**
  * Dashboard katalog tender aktif berdasarkan kategori.
  * Formulir pengajuan penawaran terenkripsi dengan validasi *client-side*.
  * Halaman riwayat penawaran terdaftar.

## 2. Tabel Kebutuhan Kriptografi

| Nama Data | Tujuan Keamanan | Prioritas | Alasan/Justifikasi |
| :--- | :--- | :--- | :--- |
| **Nilai Penawaran (Bid Amount)** | Kerahasiaan & Integritas | Tinggi | Harus dirahasiakan dari kompetitor selama masa tender berlangsung dan dipastikan tidak diubah tanpa izin. |
| **Kredensial Pengguna (Password)** | Kerahasiaan | Tinggi | Melindungi akses akun peserta bidding dari pencurian kredensial. |
| **Dokumen Kontrak Pemenang** | Integritas & Nirpenyangkalan | Sedang | Menjamin keaslian dokumen kesepakatan akhir agar tidak dapat dimanipulasi. |

## 3. Komponen Antarmuka Web (React + TS + Tailwind)
* **3 Halaman Utama:** `DashboardPage`, `TenderDetailPage`, `HistoryPage`.
* **5 Komponen Reusable:** `Button`, `InputField` (dengan *error state*), `Navbar`, `Footer`, `TenderCard`.
* **Validasi Client-Side:** Memastikan nama perusahaan terisi dan nilai bid merupakan angka positif yang melebihi batas minimum penawaran.

## 4. Teknologi & Keamanan
* **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons.
* **Kriptografi & Backend utils:** Node.js `crypto` (AES-256-GCM, PBKDF2), `randomBytes` (CSPRNG).
* **Testing:** Jest untuk unit test kriptografi, Lighthouse untuk aksesibilitas web.

## 5. Cara Menjalankan Proyek
1. Clone repositori ini.
2. Install dependensi:
   ```bash
   npm install --legacy-peer-deps