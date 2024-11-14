// models/Volumen.js
import { DataTypes } from 'sequelize';
import { db } from '../../config/dbConfig.js';

const Volumen = db.define('Volumen', {
    VolumenID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'Volumen',
    timestamps: false,
});

export default Volumen;
