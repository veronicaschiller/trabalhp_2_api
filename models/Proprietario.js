import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Proprietario = sequelize.define("proprietario",{
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nome:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    cpf:{
        type:DataTypes.STRING(11),
        allowNull:false,
        unique: true,
        validate:{
            len: [11],
            msg: "CPF inválido!"
        }
    },
    telefone: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len:[12],
            msg: 'Telefone inválido!'
        }
    }
},{
    timestamps: false,
})

