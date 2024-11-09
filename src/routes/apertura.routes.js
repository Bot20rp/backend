import { Router } from "express";
import{InicoApertura} from "../controllers/Apertura.Controllers.js"


const router=Router();

router.post('/apertura',InicoApertura);
export default router;