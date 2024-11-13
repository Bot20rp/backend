import { Router } from "express";
import {getComprobantes} from "../controllers/Comprobante.controllers.js"

const router=Router();

 router.get('/comprobantes',getComprobantes);

export default router;