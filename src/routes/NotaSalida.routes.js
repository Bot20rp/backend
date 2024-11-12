import {Router} from "express"
import { getTipoSalida } from "../controllers/notaSalida.controllers.js";

const router = Router();

router.get('/getTipoSalida',getTipoSalida); 
export default router;