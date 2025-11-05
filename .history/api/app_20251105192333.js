// =======================================================
// 🚀 app.js — Configuração principal do servidor Express
// =======================================================
import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import bdconnect from "./config/dbconnect.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());
app.set("json spaces", 2);

// ===========================================
// 📡 Conexão com o banco de dados
// ===========================================
(async () => {
  try {
    await bdconnect();
    console.log("✅ Conectado ao banco de dados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  }
})();

// ===========================================
// 🌐 Servir arquivos estáticos (Front-end)
// ===========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Express entrega tudo que está dentro de /public
app.use(express.static(path.join(__dirname, "../public")));

// ===========================================
// 🛣️ Rotas da API
// ===========================================
app.use("/api", routes);

// ===========================================
// ⚙️ Exporta o handler padrão do Express
// ===========================================
export default (req, res) => app(req, res);
