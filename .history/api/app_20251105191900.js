// 🚀 app.js — Configuração principal do servidor Express // ======================================================= import "dotenv/config"; import express from "express"; import cors from "cors"; import routes from "./routes/index.js"; import bdconnect from "./config/dbconnect.js"; const app = express(); app.use(express.json()); app.use(cors()); app.set("json spaces", 2); // =========================================== // 📡 Conexão com o banco de dados // =========================================== (async () => { try { await bdconnect(); console.log("✅ Conectado ao banco de dados com sucesso!"); } catch (error) { console.error("❌ Erro ao conectar ao banco de dados:", error); } })(); // =========================================== // 🛣️ Rotas // =========================================== routes(app); // =========================================== // ⚙️ Exporta o handler padrão do Express // =========================================== // ⬇️ Isso permite o funcionamento correto no Vercel export default (req, res) => app(req, res);






