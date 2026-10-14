# Data Flow Diagram (DFD) - E-Bidding Migas

Berikut adalah model Data Flow Diagram (DFD) menggunakan sintaks *Mermaid* yang menggambarkan aliran data, proses, entitas, dan *Trust Boundary*.

```mermaid
dfd
    %% Entitas Eksternal
    entity E1 "Peserta Bidding (Perusahaan)"

    %% Proses
    process P1 "Sistem Autentikasi (S2)"
    process P2 "Sistem Manajemen Tender (S2)"

    %% Data Stores
    datastores DS1 "DB Pengguna (S3) [Menyimpan D2, D4]"
    datastores DS2 "DB Tender (S3) [Menyimpan D1(Kripto), D3]"

    %% Trust Boundaries
    boundary TB1 "Internet (Public Network)"
    boundary TB2 "Internal Network (VPC/DMZ)"

    %% Aliran Data
    E1 -- "1. Kirim Kredensial (D2)" --> TB1
    TB1 --> P1
    P1 -- "2. Validasi Kredensial & Ambil Hash" --> TB2
    TB2 --> DS1
    
    E1 -- "3. Ajukan Penawaran (D1, D4)" --> TB1
    TB1 --> P2
    P2 -- "4. Enkripsi Penawaran & Simpan (D1)" --> TB2
    TB2 --> DS2
    
    %% Keterangan:
    %% - D1 dan D2 adalah aset yang ditandai dilindungi Kriptografi.
    %% - TB1 memisahkan pengguna luar dengan sistem internal.
    %% - TB2 memisahkan Web/API Server dengan Database internal.
```

**Keterangan Elemen DFD:**
*   **Entitas:** `E1` (Peserta Bidding Eksternal)
*   **Proses:** `P1` (API Autentikasi), `P2` (API Tender)
*   **Data Store:** `DS1` (Database Kredensial), `DS2` (Database Tender & Bid)
*   **Trust Boundary:** `TB1` (Internet Terbuka), `TB2` (Jaringan Internal Server-ke-Database)
*   **Aset dilindungi Kriptografi:** Aliran data `D1` (pada P2 -> DS2) dan `D2` (pada DS1).