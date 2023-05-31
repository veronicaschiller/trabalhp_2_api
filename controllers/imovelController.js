import { Proprietario } from "../models/Proprietario.js";
import { Imovel } from "../models/Imovel.js";

export const imovelIndex = async (req, res) => {
  try {
    const imovel = await Imovel.findAll({
      include: Proprietario,
    });
    res.status(200).json(imovel);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const imovelCreate = async (req, res) => {
  const { proprietario_id, nome, descricao } = req.body;

  if (!proprietario_id || !nome || !descricao) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
  }

  try {
    const proprietario = await Proprietario.findOne({
      where: { id: proprietario_id }});
    if (proprietario) {
      const imovel = await Imovel.create({
        proprietario_id,
        nome,
        descricao
      });
      res.status(200).json(imovel)
    }
  } catch (error) {
    res.status(401).json(error)
  }
};
