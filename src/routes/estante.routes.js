import { Router } from "express";
import { getEstante,createEstante } from "../controllers/estante.controllers.js";
const router = Router();

router.get('/obtMarca',getEstante); 
router.post('/createMarca',createEstante)
export default router;