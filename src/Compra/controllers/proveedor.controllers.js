import proveedor from "../models/Proveedor.js";
import { createBitacora } from "../../AdministrarUsuario/controllers/bitacora.controllers.js";
export const registrarProveedor=async (req,res)=>{
    console.log(req.body)
    const {Nombre,Contacto,Direccion,Correo}=req.body;
    try{
        const proveedorCreado=await proveedor.create({
            Nombre,Contacto,Direccion,Correo
        })
        const message=`registro al proveedor con ID ${proveedorCreado.ProveedorID}`
        const UsuarioID=req.user.id;
        await createBitacora({UsuarioID,message},res);
        res.status(200).json(
            {msg:'provedor registrado',proveedorCreado}
        )
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}


export const getProveedor=async(req,res)=>{
    try{
        const proveedores= await proveedor.findAll({where:{Estado:true}})
        console.log(proveedores)
        res.status(200).json(proveedores);
    }catch(error){
        res.status(500).json({err:error.message})
    }
}


export const getProveedorById=async(req,res)=>{
    const  idd=Number(req.params.id)
    try{
        const existeProv=await proveedor.findOne({where:{ProveedorID: idd}});
        if(!existeProv)
            return res.status(404).json({msg:"No se encontro al prov"})
        res.status(200).json(existeProv);
    }catch(error){
        res.status(500).json({err:error.message})
    }
}


export const updateProveedor=async(req,res)=>{
    console.log(req.body)
    const {Nombre,Contacto,Direccion,Correo,id}= req.body.data
    try{
        const existProveedor=await  proveedor.findByPk(Number(id))
        console.log(existProveedor)
        if(existProveedor){
            await proveedor.update({
                Nombre:Nombre || existProveedor.Nombre,
                Contacto:Contacto || existProveedor.Contacto,
                Direccion:Direccion || existProveedor.Direccion,
                Correo:Correo || existProveedor.Correo
            },{where:{
                ProveedorID:existProveedor.ProveedorID
                }
            })
        }else{
            return res.status(404).json({msg:"Proveedor no encontrado"})
        }

        const message=`actualizo al proveedor con ID ${existProveedor.ProveedorID}`
        const UsuarioID=req.user.id;
        await createBitacora({UsuarioID,message},res);
        res.status(200).json({msg:'Proveedor actualizado',})
    }catch(error){
        res.status(500).json({err:error.message})
    }
}

export const deleteProveedor = async (req, res) => {
    const { id } = req.body.data; // Extrae el ID del cuerpo de la solicitud
    console.log(req.body.data)
    // Verifica si el ID se recibió y es un número válido
    const numericId = Number(id);
    if (!id || isNaN(numericId)) {
        return res.status(400).json({ msg: "ID inválido" });
    }

    const existProveedor = await proveedor.findOne({ where: { ProveedorID: numericId } });
    if (!existProveedor) {
        return res.status(404).json({ msg: "Proveedor no encontrado" });
    }
    try {
        //await proveedor.destroy({ where: { ProveedorID: numericId } });
        await existProveedor.update({Estado:false})
        const message=`elimino al proveedor con ID ${id}`
        const UsuarioID=req.user.id;
        await createBitacora({UsuarioID,message},res);
        res.status(200).json({ msg: "Proveedor eliminado" });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const getProveedorIdByName = async (req, res) => {
    console.log(req.body)
    const { Nombre } = req.body; // Obtener el nombre del proveedor desde los parámetros
    try {
        // Buscar el proveedor por nombre
        const proveedorEncontrado = await proveedor.findOne({
            where: { Nombre: Nombre }
        });

        // Si no se encuentra el proveedor
        if (!proveedorEncontrado) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }

        // Devolver el ID del proveedor
        res.status(200).json({ ProveedorID: proveedorEncontrado.ProveedorID });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};