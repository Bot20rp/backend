// models/CantidadVolumen.js
import { DataTypes } from 'sequelize';
import Producto from './Producto.js';
import Volumen from './Volumen.js';
import { db } from '../../config/dbConfig.js';
const CantidadVolumen = db.define('CantidadVolumen', {
    ProductoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'ProductoID'
        },
        primaryKey: true,
    },
    VolumenID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Volumen,
            key: 'VolumenID'
        },
        primaryKey: true,
    }
}, {
    tableName: 'Cantidad_Volumen',
    timestamps: false, 
});



export default CantidadVolumen;
