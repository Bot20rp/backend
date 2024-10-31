import Estante from "../models/Estante.js"
export const createEstante=async (req,res)=>{
    try {
        console.log(req.body)
        const {Nombre ,Region,Ubicacion}=req.body.data
        await Estante.create({Marca,Region,Ubicacion})
        res.status(200).json({msg:"marca creada"})
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