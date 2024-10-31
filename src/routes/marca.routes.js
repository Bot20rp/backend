import { Router } from "express";
import { getMarca,createMarca } from "../controllers/marca.controllers.js";
import { verifyToken1 } from "../controllers/auth.controllers.js";
const router = Router();

router.get('/obtMarca',getMarca); 
router.post('/createMarca',verifyToken1,createMarca)
export default router;