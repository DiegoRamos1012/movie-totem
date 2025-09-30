import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import movieRoutes from "./routes/movieRoutes.js";

// Carrega as variáveis do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // para requisições com JSON
app.use(express.urlencoded({ extended: true })); // para formulários
app.use("/movies", movieRoutes);
// app.use("/screenings", screeningRoutes)
// app.use("/seats", seatRoutes)
// app.use("/snacks", snackRoutes)
// app.use("/theaters", theaterRoutes)

// Rota de teste
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Rota teste para verificar funcionamento do servidor",
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log(chalk.bold("🎞️  Backend do ProjetoCinema"));
  console.log("=".repeat(50));
  console.log(chalk.green("🚀 Servidor rodando em http://localhost:4000"));
  console.log(chalk.blue("📋 Versão do Express: 4.19.2 (LTS)"));
  console.log(chalk.yellow("🎬 Versão do Node: 24.2.0"));
  console.log("=".repeat(50));
});
