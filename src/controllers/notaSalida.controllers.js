import NotaSalida from "../models/NotaSalida.js";
import TipoSalida from "../models/TipoSalida.js";

// obtiene los tipos de salida 
export const getTipoSalida=async (req,res)=>{
    try {
        const tipoSalida= await TipoSalida.findAll();
        res.status(200).json(tipoSalida);
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

//implementacion para nota de salidas
export const registrarNotaSalida=async (req,res)=>{
    const {TipoSalidaID,Fecha,productos}=req.body
    try {
        if(!TipoSalidaID || !Fecha || !Array.isArray(productos)|| !productos.length>0){
            return res.status(400).json({ message: 'Todos los campos son obligatorios, incluyendo al menos un producto.' });
        }
        const notaSalida=await NotaSalida.create({TipoSalidaID,Fecha})
        const detalleSalidaProducto=productos.map((producto)=>({
            ...producto,NotaSalidaID:notaSalida.NotaSalidaID
        }))
        res.status(200).json({msg:"Nota salida registrada"})
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}