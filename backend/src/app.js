import express from "express";
import db from "./config/dbConnection.js";

db.on("error", console.log.bind(console, 'Erro de conexao'))
db.once("open", ()=>{
    console.log("Conexao com o banco realizada")
})


const app = express()

app.use(express.json())

export default app