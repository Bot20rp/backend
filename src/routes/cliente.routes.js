import {Router} from "express"
import { registrarCliente } from "../controllers/cliente.controller.js";
import { verifyToken1 } from "../controllers/auth.controllers.js";

const router=Router();

router.post('/clientReg',verifyToken1,registrarCliente);


export default router