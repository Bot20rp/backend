import { Router } from "express";
import { getEstante,createEstante } from "../controllers/estante.controllers.js";
import { verifyToken1 } from "../controllers/auth.controllers.js";
const router = Router();

router.get('/obtEst',getEstante); 
router.post('/crearEst',verifyToken1,createEstante)
export default router;