const crypto = require('crypto');
const { encryptBid, decryptBid } = require('./src/utils/crypto');

// Membuat kunci rahasia acak 32-byte untuk simulasi
// (Nantinya di dunia nyata, kunci ini diambil dari file .env)
const dummyKey = crypto.randomBytes(32);

const nilaiPenawaran = "1500000000"; // Contoh nilai bid
console.log("Plaintext awal:", nilaiPenawaran);

try {
    // Coba Enkripsi
    const hasilEnkripsi = encryptBid(nilaiPenawaran, dummyKey);
    console.log("\n--- Hasil Enkripsi ---");
    console.log("Ciphertext:", hasilEnkripsi.ciphertext);
    console.log("IV:", hasilEnkripsi.iv);
    console.log("Auth Tag:", hasilEnkripsi.authTag);

    // Coba Dekripsi
    const hasilDekripsi = decryptBid(hasilEnkripsi, dummyKey);
    console.log("\n--- Hasil Dekripsi ---");
    console.log("Hasil akhir:", hasilDekripsi);

} catch (error) {
    console.error("Terjadi kesalahan:", error.message);
}