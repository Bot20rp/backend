import { Router } from "express";
import { registrarCompra} from '../controllers/Compras.Controllers.js';

const router=Router();

 router.post('/compras',registrarCompra);

export default router;
