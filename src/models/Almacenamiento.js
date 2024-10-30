// models/almacenamiento.js
import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';
import facturaCompra from './FacturaCompra.js';
import producto from './Producto.js'; // Asegúrate de tener este modelo definido

const almacenamiento = db.define('almacenamiento', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  FacturaComID: {
    type: DataTypes.INTEGER,
    references: {
      model: facturaCompra,
      key: 'FacturaComID',
    },
    primaryKey: true,
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    references: {
      model: producto,
      key: 'ProductoID',
    },
    primaryKey: true,
  },
}, {
  tableName: 'Almacenamiento',
  timestamps: false,
});



export default almacenamiento;
