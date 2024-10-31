import { Router } from "express";
import { getEstante,createEstante } from "../controllers/estante.controllers.js";
const router = Router();

router.get('/obtEst',getEstante); 
router.post('/crearEst',createEstante)
export default router;