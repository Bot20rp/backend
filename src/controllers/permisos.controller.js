
import Permisos,{obtenerPermisos} from "../models/Permisos.js"
import { privilegios } from "../libs/privilegios.js"

export const getPermisos=async (req,res)=>{
    try{

        const permisosAdministrador=privilegios(await obtenerPermisos(1))
        const permisosEmpleado=privilegios(await obtenerPermisos(2))
        const permisosCliente=  privilegios(await obtenerPermisos(3))
        const permisos={
            permisosAdministrador,permisosCliente,permisosEmpleado
        }
        res.status(200).json(permisos)
    }catch(error){
        res.status(500).json({err:error.message})
    }
}

export const updatePermisos=async (req,res)=>{
    try {
        const {id,bandera}=req.body.data
        await Permisos.update({Estado:Number(bandera)},
        {where:{PrivilegioID:id}})
        res.status(200).json({msg:'Permiso actualizado'})
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error.message})
    }
}
