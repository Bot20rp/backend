import Estante from "../models/Estante.js"
import { createBitacora } from './bitacora.controllers.js';
export const createEstante=async (req,res)=>{
    try {
        console.log(req.body)
        const {Nombre ,Ubicacion}=req.body.data
        await Estante.create({Nombre,Ubicacion})

        const message = `Estante creado: ${Nombre} en ${Ubicacion}`;
        await createBitacora({ UsuarioID: req.user.id, message }, res);
        
        res.status(200).json({msg:"Estante creada"})
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

export const getEstante=async (req,res)=>{
    try {
        console.log(req.body)
        const estante=await Estante.findAll();
        res.status(200).json(estante)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}