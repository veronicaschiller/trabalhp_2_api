import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Imovel } from '../models/Imovel.js'

export const Inquilino = sequelize.define('inquilino', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  cpf:{
    type:DataTypes.STRING(11),
    allowNull:false,
    unique: true,
    validate:{
        len: {
        args:[11],
        msg: "CPF inválido!"}
    }
  },
  telefone: {
    type: DataTypes.STRING(12),
    allowNull: false,
    validate: {
        len:{
          args: [12],
        msg: 'Telefone inválido!'
        }
      }
  }
},{
    timestamps: false,
  });

  Inquilino.belongsTo(Imovel, {
    foreignKey: {
      name: 'imovel_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Imovel.hasMany(Inquilino, {
    foreignKey: 'imovel_id'
  })