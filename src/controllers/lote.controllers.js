import Lote from "../models/Lote.js";
import Producto from "../models/Producto.js";
import { Sequelize, where } from "sequelize";
import { diasfaltantes } from "../libs/helpers.js";


// en el lote entra unicamente un producto 
export const createLote=async (req,res)=>{
    try {
        const {arreglo}=req.body.data//[{},{},{}]

        for(obj of arreglo){
            const {FechaInicio,FechaVencimiento,Cantidad,id}=obj;
            await Lote.create({FechaInicio,FechaExpiracion:FechaVencimiento,Cantidad,ProductoID:id})
        }
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

export const getLote=async (req,res)=>{
    try {
        const lote=await Lote.findAll({attributes:['LoteID','Cantidad','FechaInicio','FechaExpiracion',[Sequelize.col('producto.Nombre'), 'Nombre']],
            where:{Estado:true},
            include:[
                {
                    model:Producto,
                    attributes:[]
                }
            ],
            raw:true
        })
        const agregarNumerodedias=lote.map(obj=>({...obj,dias:`${diasfaltantes(obj.FechaInicio,obj.FechaExpiracion)} d`}))
        res.status(200).json(agregarNumerodedias)
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error.message})
    }
}

export const deleteLote=async (req,res)=>{
    try{
        const existe=await Lote.findByPk(Number(req.params.id))
        if(!existe){
            return res.status(404).json({msg:"Lote no encontrado"})
        }
        await existe.update({Estado:false});
        res.status(201).json({msg:"Lote eliminado"})
    }catch(error){
        res.staus(500).json({err:error.message})
    }
} 

export const updateLote= async (req,res)=>{
    try {
        const {LoteID,FechaInicio,FechaVencimiento,Cantidad,ProductoID}=req.body
        const existLote=await Lote.findByPk(LoteID);
        if(!existLote){
            return res.status(404).json({msg:"Lote no encontrado"})
        }
        await existLote.update({
            FechaInicio:FechaInicio || existLote.FechaInicio,
            FechaExpiracion:FechaVencimiento || existLote.FechaExpiracion,
            Cantidad:Cantidad || existLote.Cantidad
        })
        res.status(201).json({msg:"Lote Actualizado"})
    } catch (error) {
        res.staus(500).json({err:error.message})
    }
}
