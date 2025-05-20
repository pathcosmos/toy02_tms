const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function createOAuthTables() {
  const sqlPath = path.join(__dirname, 'oauth_tables.sql');
  const statements = fs.readFileSync(sqlPath, 'utf8')
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  let conn;
  try {
    conn = await pool.getConnection();
    for (const stmt of statements) {
      await conn.query(stmt);
    }
    console.log('OAuth tables ensured');
  } catch (err) {
    console.error('Failed to create OAuth tables:', err.message);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

if (require.main === module) {
  createOAuthTables()
    .catch(() => process.exitCode = 1)
    .finally(() => pool.end());
}

module.exports = { createOAuthTables };

