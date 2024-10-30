// models/facturaCompra.js
import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';
import proveedor from './Proveedor.js';

const facturaCompra = db.define('facturaCompra', {
  FacturaComID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Detalle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NIT: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CodigoControl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CodigoDeAutorizacion: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  TotalInteres: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AdministradorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProveedorID: {
    type: DataTypes.INTEGER,
    references: {
      model: proveedor,
      key: 'ProveedorID',
    },
    allowNull: false,
  },
}, {
  tableName: 'FacturaCompra',
  timestamps: false,
});



export default facturaCompra;
