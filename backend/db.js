require('dotenv').config();
const mariadb = require('mariadb');
const crypto = require('crypto');

function decryptPassword(enc) {
  if (!enc) return '';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
  const iv = Buffer.from(process.env.IV, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let str = decipher.update(enc, 'base64', 'utf8');
  str += decipher.final('utf8');
  return str;
}

const password = decryptPassword(process.env.DB_PASSWORD_ENC);

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password,
  database: process.env.DB_NAME,
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
