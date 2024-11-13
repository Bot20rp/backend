import { DataTypes } from 'sequelize';
import {db }from '../config/dbConfig.js';
import Producto from './Producto.js';

const Suministro = db.define('Suministro', {
  SaldoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  CantidadSaldo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CantidadMin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CantidadMax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'ProductoID'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'Suministro',
  timestamps: false
});

// Definir la relación con Producto



export default Suministro;
