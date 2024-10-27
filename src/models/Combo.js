import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";

const Combo = db.define('Combo', {
    ComboID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    FechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    FechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Estado: {  // Nuevo atributo añadido
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1  // 1 para activo, 0 para inactivo
    }
}, {
    tableName: 'Combo',
    timestamps: false
});

export default Combo;
