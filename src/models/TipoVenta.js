import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';

const TipoVenta = db.define('TipoVenta', {
    TipoVID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'TipoVenta',
    timestamps: false
});

export default TipoVenta;
