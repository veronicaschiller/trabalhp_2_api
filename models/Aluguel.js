import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Imovel } from '../models/Imovel.js'
import { Inquilino } from '../models/Inquilino.js'
import { Proprietario } from '../models/Proprietario.js'

export const Aluguel = sequelize.define("Aluguel", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valor:{
        type:DataTypes.DECIMAL(6,2),
        allowNull: false
    },
    data_inicio: {
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    data_termino: {
        type:DataTypes.DATE,
    }
}, {
    tablename: 'alugueis',
    timestamps: false
});

Aluguel.belongsTo(Proprietario, {
    foreignKey: {
      name: 'proprietario_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Proprietario.hasMany(Aluguel, {
    foreignKey: 'proprietario_id'
  })

  Aluguel.belongsTo(Inquilino, {
    foreignKey: {
      name: 'inquilino_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Inquilino.hasOne(Aluguel, {
    foreignKey: 'inquilino_id'
  })

  Aluguel.belongsTo(Imovel, {
    foreignKey: {
      name: 'imovel_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Imovel.hasOne(Aluguel, {
    foreignKey: 'imovel_id'
  })