const crypto = require('crypto');

// Menggunakan AES-256-GCM (Modern dan tersertifikasi)
const ALGORITHM = 'aes-256-gcm';
// Panjang kunci untuk AES-256 adalah 32 byte (256 bit)
const KEY_LENGTH = 32;
// Panjang Initialization Vector (IV) standar untuk GCM adalah 12 byte
const IV_LENGTH = 12;

/**
 * Fungsi untuk mengenkripsi data
 * @param {string} text - Teks asli (plaintext) yang akan dienkripsi (contoh: Nilai Bid)
 * @param {Buffer} key - Kunci rahasia (harus 32 byte)
 * @returns {object} Objek berisi IV, Auth Tag, dan Ciphertext
 */
function encryptBid(text, key) {
    if (!key || key.length !== KEY_LENGTH) {
        throw new Error('Kunci enkripsi harus berukuran tepat 32 byte.');
    }

    // Menggunakan CSPRNG bawaan Node.js untuk menghasilkan IV yang acak dan aman
    const iv = crypto.randomBytes(IV_LENGTH);

    // Membuat instance cipher dengan algoritma, kunci, dan IV
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    // Proses enkripsi
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Mendapatkan Authentication Tag untuk GCM (mencegah manipulasi data)
    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex'),
        ciphertext: encrypted
    };
}

/**
 * Fungsi untuk mendekripsi data
 * @param {object} encryptedData - Objek hasil enkripsi (berisi iv, authTag, dan ciphertext)
 * @param {Buffer} key - Kunci rahasia (harus sama dengan kunci enkripsi)
 * @returns {string} Teks asli (plaintext)
 */
function decryptBid(encryptedData, key) {
    if (!key || key.length !== KEY_LENGTH) {
        throw new Error('Kunci dekripsi harus berukuran tepat 32 byte.');
    }

    const iv = Buffer.from(encryptedData.iv, 'hex');
    const authTag = Buffer.from(encryptedData.authTag, 'hex');

    // Membuat instance decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    
    // Menetapkan Authentication Tag untuk memverifikasi integritas
    decipher.setAuthTag(authTag);

    // Proses dekripsi
    let decrypted = decipher.update(encryptedData.ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

/**
 * Fungsi untuk melakukan hashing password menggunakan PBKDF2
 * @param {string} password - Password dari pengguna
 * @returns {object} Objek berisi salt dan hash password
 */
function hashPassword(password) {
    // Menghasilkan salt acak menggunakan CSPRNG
    const salt = crypto.randomBytes(16).toString('hex');
    // Melakukan hashing dengan algoritma PBKDF2 (SHA-512)
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    
    return { salt, hash };
}

// Mengekspor fungsi agar bisa digunakan di file lain (terutama untuk testing nanti)
module.exports = {
    encryptBid,
    decryptBid,
    hashPassword
};