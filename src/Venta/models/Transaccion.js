import { DataTypes } from 'sequelize';
import { db } from '../../config/dbConfig.js';
import TipoPago from './TipoPago.js';   // Asegúrate de importar el modelo TipoPago
import NotaVenta from './NotaVenta.js'; // Asegúrate de importar el modelo NotaVenta
import Apertura from './Apertura.js';   // Asegúrate de importar el modelo Apertura

const Transaccion = db.define('Transaccion', {
    TipoPagoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: TipoPago,
            key: 'TipoPagoID'
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
    Monto: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    AperturaID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Apertura,
            key: 'AperturaID'
        }
    }
}, {
    tableName: 'Transaccion',
    timestamps: false
});



export default Transaccion;
