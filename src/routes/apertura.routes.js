import { Router } from "express";
import{InicoApertura,CierreApertura,ObtenerAperturaActivas} from "../controllers/Apertura.Controllers.js"


const router=Router();

router.post('/apertura',InicoApertura);
router.patch('/cierre',CierreApertura); 
router.get("/getapertura", ObtenerAperturaActivas);
export default router;