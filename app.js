import express from "express";
import cors from "cors"
import router from "./routes.js"
import { sequelize } from "./databases/conecta.js";
import { Proprietario } from "./models/Proprietario.js";
import { Inquilino } from "./models/Inquilino.js"; 
import { Aluguel } from "./models/Aluguel.js";
import { Imovel } from "./models/Imovel.js";

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(router)

async function conecta_db() {
    try {
        await sequelize.authenticate()
        console.log('Conexão com banco de dados realizada com sucesso');
        await Proprietario.sync()
        await Imovel.sync()
        await Inquilino.sync()
        await Aluguel.sync()
    } catch (error) {
        console.error('Erro na conexão com o banco: ', error);
    }
}
conecta_db()

app.get('/',(req , res)=>{
    res.send('API Imobiliaria')
})

app.listen(port, ()=>{
    console.log(`Servidor Rodando na Porta: ${port}`);
})