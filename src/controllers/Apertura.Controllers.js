import { json } from "sequelize";
import Apertura from "../models/Apertura.js";

export const InicoApertura = async (req, res)=>{
    try {
        const {CajaChica,FechaInicio, HoraInicio}=req.body; 

        // verifica apertura
        const aperturaActiva= await Apertura.findOne({
            where :{FechaCierre:null}
        });
        if (aperturaActiva){
            return res.status(400).json({message:"ya hay una apertura activa"});
        }

        const nuevaApertura =await Apertura.create({
            FechaInicio, 
            FechaCierre:null,
            SaldoEfectivo:0, 
            SaldoQr:0,
            SaldoTarjeta:0,
            recuentoEfectivo:0, 
            recuentoQr:0,
            recuentoTarjeta:0,
            CajaChica,
            HoraInicio,
            Estado: true
        }); 

        res.status(201).json({
            message:"Apertura Inicidada ",
            data:nuevaApertura
        }); 
    }catch(error){
        console.error("Error al iniciar la apertura:", error); 
        res.status(500).json({message:"Erro al iniciar la apertura."});
    }

}; 

