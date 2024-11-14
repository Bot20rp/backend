import Rol from "../models/Rol.js";

export const getRol=async (req,res)=>{
    try {
        const roles= await Rol.findAll();
        res.status(200).json(roles)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}