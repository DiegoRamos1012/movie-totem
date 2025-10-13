import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import movieRoutes from "./routes/movieRoutes.js";
import screeningRoutes from "./routes/screeningRoutes.js";
import theaterRoutes from "./routes/theaterRoutes.js";
import snackRoutes from "./routes/snackRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import { AppDataSource } from "./config/database.js";
import { ScreeningJobs } from "./jobs/ScreeningJobs.js";

// Carrega as variáveis do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // para requisições com JSON
app.use(express.urlencoded({ extended: true })); // para formulários
app.use("/movies", movieRoutes);
app.use("/screenings", screeningRoutes);
app.use("/theaters", theaterRoutes);
app.use("/seats", seatRoutes);
app.use("/snacks", snackRoutes);

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

    // Executar job a cada 10 minutos
    setInterval(
      () => screeningJobs.deactivateExpiredScreenings(),
      10 * 60 * 1000
    );

    // Executar uma vez após 30 segundos
    setTimeout(() => screeningJobs.deactivateExpiredScreenings(), 30 * 1000);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(chalk.bold("🎞️  Backend do ProjetoCinema"));
      console.log(chalk.green(`🚀 Servidor: http://localhost:${PORT}`));
      console.log(chalk.blue("📋 Express: 4.19.2 (LTS)"));
      console.log(chalk.yellow(`🗄️  Database: ${process.env.DB_NAME}`));
      console.log(chalk.cyan(`🔗 Status da conexão: CONECTADO`));
      console.log(
        chalk.magenta("🤖 Job automático: Ativo (executa a cada 10 min)")
      );
      console.log("=".repeat(50));
    });
  })
  .catch((error) => {
    console.error(chalk.red("❌ Erro ao conectar com banco:"), error);
  });
