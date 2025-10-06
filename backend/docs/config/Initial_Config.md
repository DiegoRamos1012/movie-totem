[← Back to docs README](../README.md) • [Portuguese version](./config_inicial.md)

# Initial Configuration of Backend

This document describes the minimal steps to prepare and run the backend locally.

Prerequisites

- Node.js and pnpm installed.
- PostgreSQL running and accessible.

Step 1 — Install dependencies

- Run:
  pnpm i

Step 2 — Create the .env file

- Copy the example file and edit environment variables:
  - Unix / macOS:
    ```bash
    cp .env.example .env
    ```
  - Windows (PowerShell):
    ```powershell
    Copy-Item .env.example .env
    ```
    Then edit `.env` to set `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` and `DB_NAME`.

Step 3 — Verify the database

- Ensure the PostgreSQL service is running and the credentials in `.env` are correct.

Step 4 — Generate and run migrations (TypeORM)

- Generate migration (optional if already present):
  pnpm typeorm migration:generate ./src/migrations/InitialMigration -d ./src/config/database.ts
- Run migrations:
  pnpm run migration:run

Step 5 — Run in development mode

- Start the server:
  pnpm run dev
- Check logs to confirm database connection and server status.
  [← Back to docs README](../README.md) • [Portuguese version](./config_inicial.md)

# Initial Configuration of Backend

This document describes the minimal steps to prepare and run the backend locally.

Prerequisites

- Node.js and pnpm installed.
- PostgreSQL running and accessible.

Step 1 — Install dependencies

- Run:
  pnpm i

Step 2 — Create the .env file

- Copy the example file and edit environment variables:
  - Unix / macOS:
    ```bash
    cp .env.example .env
    ```
  - Windows (PowerShell):
    ```powershell
    Copy-Item .env.example .env
    ```
    Then edit `.env` to set `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` and `DB_NAME`.

Step 3 — Verify the database

- Ensure the PostgreSQL service is running and the credentials in `.env` are correct.

Step 4 — Generate and run migrations (TypeORM)

- Generate migration (optional if already present):
  pnpm typeorm migration:generate ./src/migrations/InitialMigration -d ./src/config/database.ts
- Run migrations:
  pnpm run migration:run

Step 5 — Run in development mode

- Start the server:
  pnpm run dev
- Check logs to confirm database connection and server status.

Notes

- Ports and credentials are configured in the `.env` file.
- If connection errors occur, verify firewall rules, user/password, and that the database accepts TCP connections.
- For troubleshooting tips (pnpm, migrations, DB), check `/explanations`.
