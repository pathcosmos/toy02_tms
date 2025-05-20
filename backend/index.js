const express = require('express');
const session = require('express-session');
const { testConnection } = require('./src/db/db');
const { createOAuthTables } = require('./src/db/createOAuthTables');
const passport = require('./src/auth/passport');
const authRoutes = require('./src/routes/auth');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
  secret: 'oauthsample',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.use('/auth', authRoutes);

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

