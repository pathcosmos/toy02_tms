# toy02_tms

This repository contains a simple setup with a Node.js backend and a React frontend. Both are placed in separate folders:

- **backend/**: A basic Express server.
- **frontend/**: A minimal React application configured with webpack and Babel.

Each folder contains its own `package.json` with the required dependencies and scripts.

## Backend database configuration

The backend expects a MariaDB database. Environment variables are loaded from
an `.env` file. Copy `backend/.env.example` to `backend/.env` and fill in the
values. The password is stored in encrypted form. To generate the required
variables run:

```bash
node encryptPassword.js "yourPassword"
```

This will output `ENCRYPTION_KEY`, `IV` and `DB_PASSWORD_ENC` which you should
place in `backend/.env` along with the database host and user values.

When the server starts it will attempt to connect to the database and log the
result.

## OAuth table setup

After configuring the database connection, the OAuth tables will be created automatically when the backend starts. You can also create them manually by running:

```bash
node src/db/createOAuthTables.js
```

This script reads `backend/src/db/oauth_tables.sql` and ensures the `oauth_users` and `oauth_tokens` tables exist. The same logic runs during server startup so the tables are present without an extra step.

