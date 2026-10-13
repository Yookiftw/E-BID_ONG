const crypto = require('crypto');
const { encryptBid, decryptBid, hashPassword } = require('../src/utils/crypto');

describe('Skenario Uji Kriptografi: E-Bidding Migas', () => {
    // Persiapan data untuk pengujian
    const dummyKey = crypto.randomBytes(32);
    const nilaiBid = "2500000000"; // Contoh bid 2.5 Miliar
    let encryptedObject; // Variabel untuk menyimpan hasil enkripsi sementara

    // ---------------------------------------------------------
    // UJI 1: POSITIF (Menguji Fungsi Enkripsi)
    // ---------------------------------------------------------
    test('Uji 1 (Berhasil): Enkripsi penawaran menghasilkan ciphertext, IV, dan AuthTag', () => {
        encryptedObject = encryptBid(nilaiBid, dummyKey);
        
        // Memastikan output memiliki properti yang dibutuhkan
        expect(encryptedObject).toHaveProperty('ciphertext');
        expect(encryptedObject).toHaveProperty('iv');
        expect(encryptedObject).toHaveProperty('authTag');
        
        // Memastikan ciphertext berbeda dari nilai asli (terenkripsi)
        expect(encryptedObject.ciphertext).not.toBe(nilaiBid);
    });

    // ---------------------------------------------------------
    // UJI 2: POSITIF (Menguji Fungsi Dekripsi)
    // ---------------------------------------------------------
    test('Uji 2 (Berhasil): Dekripsi mengembalikan nilai plaintext yang sesuai', () => {
        // Mendekripsi objek yang dihasilkan dari Uji 1
        const decryptedText = decryptBid(encryptedObject, dummyKey);
        
        // Memastikan hasil dekripsi persis sama dengan input asli
        expect(decryptedText).toBe(nilaiBid);
    });

    // ---------------------------------------------------------
    // UJI 3: POSITIF (Menguji Fungsi Hashing)
    // ---------------------------------------------------------
    test('Uji 3 (Berhasil): Hashing password menghasilkan salt dan hash yang aman', () => {
        const passwordLokal = "adminMigas123!";
        const result = hashPassword(passwordLokal);
        
        expect(result).toHaveProperty('salt');
        expect(result).toHaveProperty('hash');
        
        // Memastikan password asli tidak tersimpan dalam bentuk aslinya
        expect(result.hash).not.toBe(passwordLokal);
    });

    // ---------------------------------------------------------
    // UJI 4: NEGATIF / BATAS (Menguji Error Handling)
    // ---------------------------------------------------------
    test('Uji 4 (Gagal/Batas): Dekripsi menolak akses dan error jika menggunakan kunci yang salah', () => {
        const wrongKey = crypto.randomBytes(32); // Kunci penyusup/salah
        
        // Fungsi decryptBid diharapkan melemparkan (throw) error saat didekripsi dengan kunci yang salah
        expect(() => {
            decryptBid(encryptedObject, wrongKey);
        }).toThrow();
    });
});