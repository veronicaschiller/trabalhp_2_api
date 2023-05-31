import { Imovel } from "../models/Imovel.js";
import { Inquilino } from "../models/Inquilino.js";
import { Proprietario } from "../models/Proprietario.js";

export const inquilinoIndex = async (req, res) =>{
    try {
        const inquilino =  await Inquilino.findAll({
            include:[Imovel]
        })
        res.status(200).json(inquilino)
    } catch (error) {
        res.status(400).json(error)
    }
}