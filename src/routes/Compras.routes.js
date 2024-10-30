import { Router } from "express";
import { verifyToken1 } from "../controllers/auth.controllers.js";
import { registrarCompra} from '../controllers/compras.controllers.js';

const router=Router();

 router.post('/compras',verifyToken1,registrarCompra);

export default router;
