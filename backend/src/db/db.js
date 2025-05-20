require('dotenv').config();
console.log('[dotenv] DB_HOST         :', process.env.DB_HOST);
console.log('[dotenv] DB_PORT         :', process.env.DB_PORT);
console.log('[dotenv] DB_NAME         :', process.env.DB_NAME);
console.log('[dotenv] DB_USER         :', process.env.DB_USER);
console.log('[dotenv] ENCRYPTION_KEY  :', process.env.ENCRYPTION_KEY);
console.log('[dotenv] IV              :', process.env.IV);
console.log('[dotenv] DB_PASSWORD_ENC :', process.env.DB_PASSWORD_ENC);

const mariadb = require('mariadb');
const crypto = require('crypto');

function decryptPassword(enc) {
  if (!enc) {
    console.error('[decryptPassword] 암호화된 비밀번호가 없습니다.');
    return '';
  }
  try {
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
    const iv = Buffer.from(process.env.IV, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // 특수문자 대응: 입력은 base64, 출력은 utf8로 명확히 지정
    let decrypted = decipher.update(enc, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('[decryptPassword] 복호화 실패:', err.message);
    return '';
  }
}

const password = decryptPassword(process.env.DB_PASSWORD_ENC);
console.log('[dotenv] Decrypted DB_PASSWORD:', password ? password : '(복호화 실패)');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  acquireTimeout: 20000
});

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.ping();
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { pool, testConnection };