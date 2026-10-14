# Register Risiko (Risk Register) & Rencana Kontrol

Penilaian risiko didasarkan pada kondisi produk E-Bidding Migas yang menangani nilai proyek triliunan Rupiah. 
*   **Kemungkinan (Likelihood):** 1 (Sangat Rendah) - 5 (Sangat Tinggi).
*   **Dampak (Impact):** 1 (Sangat Rendah) - 5 (Sangat Tinggi, misal: hilangnya integritas lelang migas).
*   **Skor Risiko = Kemungkinan $\times$ Dampak**

## 1. Penilaian Seluruh Ancaman (Threats)

| ID | Ancaman | Kemungkinan | Dampak | Skor | Alasan (Kondisi Produk) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TM-01** | Spoofing (Credential Stuffing) | 4 | 4 | **16** | Migas sering diincar; pengguna sering mengulang password. Dampaknya kompetitor bisa memata-matai akun. |
| **TM-02** | Tampering (MitM pada Bid) | 2 | 5 | **10** | Kemungkinan rendah jika HTTPS aktif, tapi dampaknya fatal (penawaran diubah memenangkan pihak tertentu). |
| **TM-03** | Repudiation (Sangkalan Bid) | 3 | 4 | **12** | Logika web standar tanpa tanda tangan digital rentan terhadap sengketa hukum pasca-tender. |
| **TM-04** | Info Disclosure (Curi Session) | 3 | 5 | **15** | Tanpa flag cookie aman, eksploitasi XSS/sniffing bisa membajak sesi akun petinggi perusahaan migas. |
| **TM-05** | DoS (Login Flooding) | 4 | 4 | **16** | Sangat mungkin terjadi bot brute-force; dampaknya peserta sah tidak bisa ikut tender. |
| **TM-06** | EoP (Manipulasi Parameter ID) | 4 | 5 | **20** | Kerentanan *Broken Access Control* sangat umum di awal pengembangan web. Dampak: bocornya data pesaing (fatal). |
| **TM-07** | Spoofing (Koneksi Internal DB) | 1 | 5 | **5** | Sulit dieksekusi (butuh akses internal), namun dampaknya kebocoran masif. |
| **TM-08** | Tampering (SQL Injection) | 4 | 5 | **20** | Form input tender sering tidak tersanitasi. Jika bobol, integritas platform hancur lebur. |
| **TM-09** | Info Disclosure (Scraping Data) | 5 | 3 | **15** | Scraper otomatis mudah dibuat; dampaknya eksposur data kompetitor tapi bukan nilai bid (sudah dienkripsi). |
| **TM-10** | DoS (Full Table Scan DB) | 3 | 4 | **12** | Rentan jika index database belum diset, membuat aplikasi *down* saat *traffic* tinggi. |

---

## 2. Lima (5) Risiko Prioritas & Rencana Kontrol
Berdasarkan skor tertinggi, berikut 5 risiko prioritas yang akan ditangani pada Tugas 2 dan 3.

| Prioritas | ID | Skor | Rencana Kontrol (Mitigasi) | Pemetaan Tugas Berikutnya |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **TM-06** (Elevation of Privilege) | **20** | Menerapkan *Role-Based Access Control* (RBAC) ketat dan validasi level otorisasi di sisi server (backend) untuk setiap API endpoint. | **Tugas 3** (Implementasi Keamanan Lanjut / Otorisasi) |
| **2** | **TM-08** (Tampering / SQLi) | **20** | Menggunakan *Prepared Statements* (Parameterized Queries) di ORM backend dan memvalidasi tipe data input dari frontend. | **Tugas 2** (Validasi Input & Pencegahan Injeksi) |
| **3** | **TM-01** (Spoofing / Credential) | **16** | Menerapkan kebijakan password kuat, *rate-limiting* pada endpoint login, dan hashing dengan *salt* unik (sudah disiapkan di Tugas 1 Kriptografi). | **Tugas 2** (Autentikasi & Keamanan Endpoint) |
| **4** | **TM-05** (DoS / Login Flooding) | **16** | Implementasi pembatasan laju (*Rate Limiting*) berbasis IP dan *Captcha* pada halaman form *login*. | **Tugas 2** (Pengendalian Laju Request) |
| **5** | **TM-04** (Info Disclosure / Session) | **15** | Mengonfigurasi flag `Secure`, `HttpOnly`, dan `SameSite=Strict` pada pengiriman cookie otentikasi. | **Tugas 3** (Manajemen Sesi & Header Keamanan) |