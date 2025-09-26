import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";

// Carrega as variáveis do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares nativos do Express 5
app.use(express.json()); // para requisições com JSON
app.use(express.urlencoded({ extended: true })); // para formulários

// Rota de teste
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Rota teste para verificar funcionamento do servidor" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
