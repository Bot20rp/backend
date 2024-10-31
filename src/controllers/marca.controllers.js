import Marca from "../models/Marca.js";

export const createMarca=async (req,res)=>{
    try {
        console.log(req.body)
        const {Nombre ,Region}=req.body.data
        await Marca.create({Nombre,Region})
        res.status(200).json({msg:"marca creada"})
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

export const getMarca=async (req,res)=>{
    try {
        console.log(req.body)
        const marc=await Marca.findAll();
        res.status(200).json(marc)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}