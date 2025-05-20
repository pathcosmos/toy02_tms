const express = require('express');
const { testConnection } = require('./db');
const { createOAuthTables } = require('./src/db/createOAuthTables');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

async function start() {
  await testConnection();
  await createOAuthTables();

  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});

