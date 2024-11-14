import { DataTypes } from "sequelize";
import { db } from "../../config/dbConfig.js";

const tipoSalida=db.define('TipoSalida',{
    TipoSalidaID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Descripcion:{
        type:DataTypes.STRING(100)
    },

},{
    tableName:'TipoSalida',
    timestamps:false
})
export default tipoSalida;