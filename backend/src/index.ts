import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import movieRoutes from "./routes/movieRoutes.js";
import { AppDataSource } from "./config/database.js";
import { ScreeningJobs } from "./jobs/ScreeningJobs.js";

// Carrega as variáveis do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // para requisições com JSON
app.use(express.urlencoded({ extended: true })); // para formulários
app.use("/movies", movieRoutes);

// Rota de teste
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Rota teste para verificar funcionamento do servidor",
    database: AppDataSource.isInitialized ? "Conectado" : "Desconectado",
  });
});

// Inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log("=".repeat(50));
    console.log(chalk.green("✅ Banco de dados conectado!"));

    // Instanciar jobs após conectar no banco
    const screeningJobs = new ScreeningJobs();

    // ✅ Armazenar referência do interval para poder cancelar depois
    const jobInterval = setInterval(
      () => screeningJobs.deactivateExpiredScreenings(),
      10 * 60 * 1000
    );

    // Executar uma vez após 30 segundos
    setTimeout(() => screeningJobs.deactivateExpiredScreenings(), 30 * 1000);

    // ✅ GRACEFUL SHUTDOWN - Captura sinais de encerramento
    const gracefulShutdown = (signal: string) => {
      console.log(chalk.yellow(`\n⏹️ Encerrando servidor...`));

      // 1. Parar de aceitar novas requisições
      server.close(() => {
        console.log(chalk.blue("✅ Servidor HTTP finalizado"));

        console.log(chalk.blue("🔄 Cancelando jobs automáticos..."));

        // 2. Cancelar jobs automáticos
        clearInterval(jobInterval);
        console.log(chalk.blue("✅ Job automático cancelado"));

        console.log(chalk.blue("🔄 Fechando conexão com banco..."));

        // 3. Fechar conexão com banco
        AppDataSource.destroy()
          .then(() => {
            console.log(chalk.blue("✅ Conexão com banco fechada"));
            console.log(chalk.green("🎬 Sistema encerrado com segurança!"));
            process.exit(0);
          })
          .catch(() => process.exit(1));
      });
    };

    // ✅ Armazenar referência do servidor para poder fechar
    const server = app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(chalk.bold("🎞️  Backend do ProjetoCinema"));
      console.log(chalk.green(`🚀 Servidor: http://localhost:${PORT}`));
      console.log(chalk.blue("📋 Express: 4.19.2 (LTS)"));
      console.log(chalk.yellow(`🗄️  Database: ${process.env.DB_NAME}`));
      console.log(chalk.cyan(`🔗 Status da conexão: CONECTADO`));
      console.log(
        chalk.magenta("🤖 Job automático: Ativo (executa a cada 10 min)")
      );
      console.log(
        chalk.gray("💡 Pressione Ctrl+C para encerrar com segurança")
      );
      console.log("=".repeat(50));
    });

    // ✅ Registrar listeners para sinais de encerramento
    process.on("SIGINT", () => gracefulShutdown("SIGINT")); // Ctrl+C
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Kill command
  })
  .catch((error) => {
    console.error(chalk.red("❌ Erro ao conectar com banco:"), error);
  });
