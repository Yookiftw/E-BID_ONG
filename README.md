# E-Bidding Migas

## 1. Deskripsi Produk
**E-Bidding Migas** adalah platform *Business-to-Business* (B2B) berbasis web yang dirancang khusus untuk industri Minyak dan Gas Bumi (Migas). Aplikasi ini memfasilitasi pelaksanaan sesi bidding atau tender untuk pengadaan logistik, alat berat, dan penyewaan wilayah kerja blok migas secara terintegrasi, transparan, dan aman. Fokus utama platform ini adalah menjaga integritas proses tender sekaligus menjamin kerahasiaan penawaran dari masing-masing peserta kompetitor selama sesi bidding berlangsung, mencegah terjadinya kebocoran informasi yang dapat merugikan pihak-pihak yang terlibat.

## 2. Tabel Kebutuhan Kriptografi
Berikut adalah identifikasi kebutuhan kriptografi untuk mengamankan data sensitif dalam platform:

| Nama Data | Tujuan Keamanan | Prioritas | Alasan/Justifikasi |
| :--- | :--- | :--- | :--- |
| **Nilai Penawaran (Bid Amount)** | Kerahasiaan (Confidentiality) & Integritas (Integrity) | Tinggi | Nilai penawaran adalah inti dari proses bidding. Harus dirahasiakan dari kompetitor lain selama masa tender berlangsung (Confidentiality) dan dipastikan tidak diubah oleh pihak yang tidak berwenang setelah diajukan (Integrity). |
| **Kredensial Pengguna (Password)** | Kerahasiaan (Confidentiality) | Tinggi | Password digunakan untuk autentikasi peserta dan administrator. Kebocoran password dapat memberikan akses tidak sah ke akun peserta bidding, sehingga sangat kritis untuk dilindungi (umumnya dengan *hashing* yang ditambahkan *salt*). |
| **Dokumen Kontrak Pemenang** | Integritas (Integrity) & Nirpenyangkalan (Non-repudiation) | Sedang | Dokumen kontrak yang disetujui harus dijamin keasliannya dan tidak dapat diubah tanpa jejak (Integrity). Pihak pemenang dan penyelenggara juga tidak boleh menyangkal persetujuan yang telah dibuat (Non-repudiation, misalnya dengan Tanda Tangan Digital). |

## 3. Rancangan Komponen Awal

### a. Alur Komponen (Masukan - Proses - Keluaran)
- **Masukan (Input):** Pengguna (Peserta Bidding) memasukkan data penawaran (contoh: ID Barang/Blok, Nilai Bid, ID Perusahaan) melalui antarmuka web.
- **Proses:** 
    1. Sistem (Backend) menerima data.
    2. Sistem memvalidasi input.
    3. Sistem mengenkripsi *Nilai Bid* menggunakan algoritma enkripsi yang kuat (misal: AES-256-GCM) sebelum disimpan ke basis data.
- **Keluaran (Output):** Pesan konfirmasi keberhasilan pengajuan penawaran kepada pengguna. Data tersimpan di basis data dalam format terenkripsi (Ciphertext).

### b. Representasi Data
Pertukaran data antara klien (Frontend) dan server (Backend) menggunakan format **JSON (JavaScript Object Notation)** melalui protokol aman (HTTPS). 
Contoh payload JSON saat submit penawaran:
```json
{
  "tender_id": "TNDR-2026-10-001",
  "company_id": "CMP-9982",
  "encrypted_bid_amount": "U2FsdGVkX19+...", 
  "iv": "a1b2c3d4..." 
}