import express from "express";
import db from "./config/dbConnection.js";
import routes from './routes/index.js' 
import cors from "cors"

db.on("error", console.log.bind(console, 'Erro de conexao'))
db.once("open", ()=>{
    console.log("Conexao com o banco realizada")
})

const app = express()
app.use(express.json())
app.use(cors())
routes(app)

export default app