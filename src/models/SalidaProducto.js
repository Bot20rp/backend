import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";

const salidaProducto=db.define('SalidaProducto',{
    NotaSalidaID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
            model:'NotaSalida',
            key:'NotaSalidaID'
        }
    },
    ProductoID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
            model:'Producto',
            key:'ProductoID'
        }
    },
    Cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    tableName:'SalidaProducto',
    timestamps:false
})
export default salidaProducto;