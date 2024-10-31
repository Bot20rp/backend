import {Router} from "express"
import { getVolumen,registrarVolumen } from "../controllers/Volumen.controllers.js"

const router = Router();

router.get('/getVolumen',getVolumen); 
router.post('/regVolumen',registrarVolumen);
export default router;