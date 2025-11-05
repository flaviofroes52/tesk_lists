// =======================================================
// 🚀 app.js — Configuração principal do servidor
// =======================================================
import express from "express";
import cors from "cors";
import routes from "./routes/index.js"; // ou o caminho correto
import "dotenv/config.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
routes(app);

// ✅ Exporta o app, não executa
export default app;
