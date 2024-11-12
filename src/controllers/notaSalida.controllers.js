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
export 