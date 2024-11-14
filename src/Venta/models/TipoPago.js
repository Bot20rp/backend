import { DataTypes } from 'sequelize';
import { db } from '../../config/dbConfig.js';

const TipoPago = db.define('TipoPago', {
    TipoPagoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING(30),
        allowNull: true // Puedes ajustarlo si lo prefieres como NOT NULL
    }
}, {
    tableName: 'TipoPago',
    timestamps: false
});

export default TipoPago;
