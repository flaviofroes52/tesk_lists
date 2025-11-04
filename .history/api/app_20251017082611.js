import "dotenv/config"
import express from 'express'
import routes from "./routes/index.js";
import cors from "cors"
import bdconnect from "./config/dbconnect.js";

const app = express();
app.use(express.json())
app.use(cors())

app.set(`json spaces`, 2)


await bdconnect();
routes(app)

const porta = process.env.PORTA;
const end = process.env.END;


app.listen(porta, ()=>console.log(`End: ${end}:${porta}`))