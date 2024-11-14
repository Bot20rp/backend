import { DataTypes } from "sequelize";
import { db } from "../../config/dbConfig.js";

const notaSalida=db.define('NotaSalida',{
    NotaSalidaID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Fecha:{
        type:DataTypes.DATE
    },
    TipoSalidaID:{
        type:DataTypes.INTEGER,
        references:{
            model:'TipoSalida',
            key:'TipoSalidaID',

        }
    }
},{
    tableName:'NotaSalida',
    timestamps:false
})
export default notaSalida;