import TipoVenta from "../models/TipoVenta.js";

export const getTipoVenta= async (req, res)=>{
    try{
        const tiposVentas = await TipoVenta.findAll({
            attributes:['TipoVID','Nombre'],
        }); 

        res.status(200).json({
            message:'tipos de ventas obtenidos',
            tiposVentas,
        });
    }catch(error){
        console.error('error al obtener los tipos de ventas',error); 
        res.status(500).json({message:'Error al obtener los tipos de ventas',error:error.message});
    }
}