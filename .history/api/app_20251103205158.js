import "dotenv/config"
import express from 'express'
import routes from "./routes/index.js";
import cors from "cors"
import bdconnect from "./config/dbconnect.js";

const app = express();
app.use(express.json())
app.use(cors())

app.set(`json spaces`, 2)


(async () => {
    try {
        await bdconnect();
        console.log("Conectado ao banco de dados com sucesso!");
    }
    catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
})();

/* /* export default app */
 */
