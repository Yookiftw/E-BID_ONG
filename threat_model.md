# Pemodelan Ancaman (Threat Modeling) STRIDE - E-Bidding Migas

Berikut adalah 10 ancaman spesifik pada platform berdasarkan diagram aliran data (DFD) dan aset yang teridentifikasi.

| ID Ancaman | Kategori STRIDE | Elemen DFD Terkait | Aset Terdampak | Deskripsi Ancaman (Spesifik) |
| :--- | :--- | :--- | :--- | :--- |
| **TM-01** | **S**poofing | E1 $\rightarrow$ P1 | D4, D5 | Penyerang menggunakan metode *Credential Stuffing* (memakai password bocor dari situs lain) untuk masuk sebagai Perusahaan Peserta Bidding (E1) yang sah. |
| **TM-02** | **T**ampering | E1 $\rightarrow$ TB1 $\rightarrow$ P2 | D1 | Penyerang (Man-in-the-Middle) mencegat lalu lintas internet (TB1) untuk mengubah *payload* Nilai Penawaran (D1) saat ditransmisikan dari klien ke API Server (P2). |
| **TM-03** | **R**epudiation | P2 $\rightarrow$ DS2 | D1, D3 | Peserta Bidding (E1) menyangkal telah mengirimkan penawaran sebesar 10 Miliar (D1) karena sistem (P2) hanya mencatat waktu tanpa *Digital Signature* yang mengikat. |
| **TM-04** | **I**nformation Disclosure | TB1 | D5 (Session) | Penyerang mengendus jaringan WiFi publik untuk mencuri Session Cookie/Token (D5) yang dikirim tanpa atribut `Secure` atau `HttpOnly` saat melewati TB1. |
| **TM-05** | **D**enial of Service | P1 | S1, S2 | Penyerang melakukan *flooding* permintaan login palsu secara masif ke API Autentikasi (P1), membuat CPU server kehabisan *resource* sehingga peserta sah gagal masuk menjelang penutupan tender. |
| **TM-06** | **E**levation of Privilege | P2 | D1, D3 | Pengguna biasa (E1) memanipulasi parameter URL (contoh: mengubah `user_id` atau `role_id` di API P2) untuk mendapatkan hak akses admin dan melihat Nilai Penawaran (D1) milik perusahaan pesaing. |
| **TM-07** | **S**poofing | P1 $\rightarrow$ TB2 $\rightarrow$ DS1 | D2, S3 | Oknum internal (misal: karyawan hosting) memalsukan identitas aplikasi (P1) untuk melakukan koneksi langsung ke Database (DS1) melewati TB2 demi mencuri Hash Kredensial. |
| **TM-08** | **T**ampering | DS2 | D1 | Peretas berhasil membobol Database Tender (DS2) melalui *SQL Injection* pada form pencarian, lalu berusaha men-dekripsi atau merusak *Ciphertext* Nilai Penawaran (D1). |
| **TM-09** | **I**nformation Disclosure | P2 | D3, D4 | API Manajemen Tender (P2) tidak membatasi limit *rate response*, sehingga peretas menggunakan bot untuk *scraping* massal seluruh data Profil Perusahaan (D4) dan Dokumen Tender (D3) secara brutal. |
| **TM-10** | **D**enial of Service | DS2 | S3 (Database) | Penyerang mengirimkan *payload* pencarian tender dengan *wildcard* yang sangat kompleks (`%...%`) ke P2, yang memaksa Database (DS2) melakukan *full table scan*, menyebabkan kelumpuhan operasional I/O disk. |