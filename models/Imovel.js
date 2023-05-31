import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Proprietario } from './Proprietario.js';

export const Imovel = sequelize.define('imovel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
  }
},{
    tablename: 'imoveis',
    timestamps: false
  });

  Imovel.belongsTo(Proprietario, {
    foreignKey: {
      name: 'proprietario_id',
      allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Proprietario.hasMany(Imovel, {
    foreignKey: 'proprietario_id'
  })