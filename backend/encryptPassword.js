const crypto = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node encryptPassword.js <password>');
  process.exit(1);
}

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(password, 'utf8', 'base64');
encrypted += cipher.final('base64');

console.log('ENCRYPTION_KEY=' + key.toString('base64'));
console.log('IV=' + iv.toString('base64'));
console.log('DB_PASSWORD_ENC=' + encrypted);
