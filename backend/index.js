const express = require('express');
const { testConnection } = require('./db');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  testConnection();
});
