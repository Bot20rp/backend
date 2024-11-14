import {Router} from "express"
import { getTipoSalida ,registrarNotaSalida} from "../controllers/notaSalida.controllers.js";

const router = Router();

router.get('/getTipoSalida',getTipoSalida); 
router.post('/registrarNotaSalida',registrarNotaSalida)
export default router;