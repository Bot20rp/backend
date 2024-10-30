import { db } from "../config/dbConfig.js"
import { DataTypes } from "sequelize"
import Producto from "./Producto.js";
const lote=db.define('Lote',{
    LoteID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    FechaInicio:{
        type:DataTypes.DATE,
        allowNull:false
    },
    FechaExpiracion:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ProductoID:{
        type:DataTypes.INTEGER,
        references:{
            model:'Producto',
            key:'ProductoID'
        }
    },
    Estado:{
        type:DataTypes.BOOLEAN
    }
},{
    tableName:'Lote',
    timestamps:false
})

Producto.hasMany(lote,{
    foreignKey:'ProductoID'
})
lote.belongsTo(Producto,{
    foreignKey:'ProductoID'
})
export default lote;