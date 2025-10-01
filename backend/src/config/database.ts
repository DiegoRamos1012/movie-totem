import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ProjetoCinema",
  synchronize: false, // ← IMPORTANTE: sempre false para usar migrations
  logging: true,
  entities: ["src/models/**/*.{ts,js}"],
  migrations: ["src/migrations/**/*.{ts,js}"],
  migrationsTableName: "migrations",
});

// ← REMOVER esta inicialização automática
// Deixar apenas no index.ts
