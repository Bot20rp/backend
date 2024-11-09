import { json } from "sequelize";
import Apertura from "../models/Apertura.js";

export const InicoApertura = async (req, res)=>{
    try {
        const {CajaChica,FechaInicio, HoraInicio,SaldoEfectivo, SaldoQr,SaldoTarjeta,recuentoEfectivo,recuentoQr,recuentoTarjeta}=req.body; 

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
            SaldoEfectivo, 
            SaldoQr,
            SaldoTarjeta,
            recuentoEfectivo, 
            recuentoQr,
            recuentoTarjeta,
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

