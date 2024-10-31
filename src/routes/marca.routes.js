import { Router } from "express";
import { getMarca,createMarca } from "../controllers/marca.controllers.js";
const router = Router();

router.get('/obtMarca',getMarca); 
router.post('/createMarca',createMarca)
export default router;