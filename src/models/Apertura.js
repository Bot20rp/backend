import { DataTypes } from "sequelize";
import {db} from '../config/dbConfig.js'; 

const Apertura = db.define('Apertura',{
    AperturaID:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    FechaInicio:{
        type:DataTypes.DATE, 
        allowNull:false,
    },
    FechaCierre:{
        type:DataTypes.DATE, 
        allowNull:false,
    },
    SaldoEfectivo:{
        type:DataTypes.FLOAT, 
        allowNull:false, 
    },
    SaldoQr:{
        type:DataTypes.FLOAT, 
        allowNull:false, 
    },
    SaldoTarjeta:{
        type:DataTypes.FLOAT, 
        allowNull:false, 
    },
    recuntoEfectivo:{
        type:DataTypes.FLOAT, 
        allowNull:false, 
    },
    recuentoQr:{
        type:DataTypes.FLOAT, 
        allowNull:false, 
    },
    recuentoTarjeta:{
        type:DataTypes.FLOAT, 
        allowNull:false, 
    },
    CajaChica:{
        type:DataTypes.FLOAT, 
        allowNull:false, 
    },
    Estado:{
        type:DataTypes.BOOLEAN, 
        allowNull:false, 
    }
},{
    tableName:'Apertura', 
    timestamps:false,
}); 

export default Apertura
