// models/Factura.js

import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';

const Factura = db.define('Factura', {
    FacturaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NroFactura:{
        type: DataTypes.INTEGER, 
        allowNull:false,
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    NIT: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Detalle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    CodigoControl: {
        type: DataTypes.STRING(30),
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
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'Factura',
    timestamps: false,
});

export default Factura;
