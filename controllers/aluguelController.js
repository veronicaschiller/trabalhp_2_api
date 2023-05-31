import { Aluguel } from "../models/Aluguel.js"
import { Imovel } from "../models/Imovel.js"
import { Inquilino } from "../models/Inquilino.js"
import { Proprietario } from "../models/Proprietario.js"
import { sequelize } from "../databases/conecta.js"

export const aluguelIndex = async (req, res) => {
    try {
        const aluguel = await Aluguel.findAll({
            include: [Proprietario, Imovel, Inquilino]
        })
        res.status(200).json(aluguel)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const aluguelCreate = async (req, res) => {
    const { nome, cpf, telefone, imovel_id, valor } = req.body
    if (!nome || !cpf || !telefone || !imovel_id || !valor) {
        res.status(400).json({ id: 0, msg: "Insira os dados completo" })
    }
    const imovel = await Imovel.findOne({ where: { id: imovel_id } })
    if (imovel.ocupado == false) {
        const t = await sequelize.transaction()
        try {
            const inquilinoExistente = await Inquilino.findOne({ where: { cpf: cpf } })
            if (!inquilinoExistente) {
               const inquilino = await Inquilino.create({
                    nome, cpf, telefone, imovel_id
                }, { transaction: t })
                var aluguel = await Aluguel.create({
                    proprietario_id: imovel.proprietario_id, inquilino_id: inquilino.id, imovel_id, valor
                }, { transaction: t })
            } else {
                var aluguel = await Aluguel.create({
                    proprietario_id: imovel.proprietario_id, inquilino_id: inquilinoExistente.id, imovel_id, valor
                }, { transaction: t })
            }
            await Imovel.update({ ocupado: true }, { where: { id: imovel_id }, transaction: t })
            await t.commit();
            res.status(200).json(aluguel)
        } catch (error) {
            await t.rollback();
            res.status(400).json(error)
        }
    } else {
        res.status(400).send("Imovel já alugado")
    }
}

export const aluguelUpdateFinaliza = async (req, res) => {
    const { id } = req.params
    const t = await sequelize.transaction()
    try {
        const aluguel = await Aluguel.findOne({ where: { id: id } })
        if (aluguel) {
            await Aluguel.update({ data_termino: new Date() }, { where: { id: id }, transaction: t })
            await Imovel.update({ ocupado: false }, { where: { id: aluguel.imovel_id }, transaction: t })
        } else {
            await t.rollback()
            res.status(400).send("Imóvel não cadastrado")
        }
        await t.commit()
        res.status(200).json(aluguel)
    } catch (error) {
        await t.rollback()
        res.status(400).json(error)
    }
}