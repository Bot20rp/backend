import { Router } from "express";
import{InicoApertura,CierreApertura} from "../controllers/Apertura.Controllers.js"


const router=Router();

router.post('/apertura',InicoApertura);
router.patch('/cierre',CierreApertura)
export default router;