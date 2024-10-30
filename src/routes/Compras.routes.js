import { Router } from "express";
import { registrarCompra} from '../controllers/compras.controllers.js';

const router=Router();

 router.post('/compras',registrarCompra);

export default router;
