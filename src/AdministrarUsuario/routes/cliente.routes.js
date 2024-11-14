import {Router} from "express"
import { registrarCliente } from "../controllers/cliente.controllers.js";


const router=Router();

router.post('/clientReg',registrarCliente);


export default router