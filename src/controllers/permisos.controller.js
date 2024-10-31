
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

export const updatePermisos = async (req, res) => {
    try {
        const { id, bandera } = req.body;  // Cambiado a req.body
        await Permisos.update(
            { Estado: Number(bandera) },
            { where: { PrivilegioID: id } }
        );
        res.status(200).json({ msg: 'Permiso actualizado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message });
    }
};

// controllers/permisosController.js


export const updatePermisos2 = async (req, res) => {
    console.log(req.body);
    const UsuarioID = req.user.id;
    try {
        const { privilegios, rol: rolId } = req.body.data;
        
        const updates = privilegios.map(privilegio => ({
            id: privilegio.id,
            estado: privilegio.Estado === true ? 1 : 0, 
        }));

        
        for (const { id, estado } of updates) {
            await Permisos.update(
                { Estado: estado },
                { where: { RolID: rolId, PrivilegioID: id } }
            );
        }

        const message = `Permisos actualizados para el Rol con ID: ${rolId}`;
        await createBitacora({ UsuarioID, message }, res);


        res.status(200).json({ msg: 'Permisos actualizados exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: `Error al actualizar los permisos: ${error.message}` });
    }
};


