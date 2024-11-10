import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import Rol from "./Rol.js";
const permisos= db.define('Privilegios',{
    RolID:{
        type:DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'RolID'
        },
        primaryKey: true
    },
    PrivilegioID:{
        type:DataTypes.INTEGER,
        references: {
            model: 'Privilegio',
            key: 'PrivilegioID'
        },
        primaryKey: true
        
    },
    Estado:{
        type:DataTypes.BOOLEAN
    }
},{
    tableName:'Permisos',
    timestamps:false
})

export const obtenerPermisos=async (id)=>{
    try{
        const data=await db.query(`CALL getPrivilegio(${id})`)
        console.log(data)
        return data;
    }catch(error){
        throw new Error (`Error al llamar el PA ${error.message}`)
    }
}

export const obtenerPermisosXRol=async (id)=>{
    try{
        const data=await db.query(`CALL getPrivXRol(${id})`)
        return data;
    }catch(error){
        throw new Error (`Error al llamar el PA ${error.message}`)
    }
}
export default permisos;