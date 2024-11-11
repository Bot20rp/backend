import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';
import Producto from './Producto.js';  // Asegúrate de importar el modelo Producto
import NotaVenta from './NotaVenta.js'; // Asegúrate de importar el modelo NotaVenta

const DetalleVenta = db.define('DetalleVenta', {
    ProductoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Producto,
            key: 'ProductoID'
        }
    },
    NotaVentaID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: NotaVenta,
            key: 'NotaVentaID'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'DetalleVenta',
    timestamps: false
});


export default DetalleVenta;
