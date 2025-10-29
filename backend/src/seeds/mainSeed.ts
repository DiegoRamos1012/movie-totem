import "reflect-metadata";
import { AppDataSource } from "../config/database";
import { seedMovies } from "./seedMovies";
import { seedSnacks } from "./seedSnacks";

async function runAllSeeds() {
  console.log("🚀 Iniciando execução de todas as seeds...");

  const dataSource = await AppDataSource.initialize();

  try {
    await seedMovies(dataSource);
    await seedSnacks(dataSource);

    console.log("✅ Todas as seeds foram executadas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao executar seeds:", error);
  } finally {
    await dataSource.destroy();
    console.log("🛑 Conexão encerrada.");
  }
}

runAllSeeds();
