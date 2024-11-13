import { Router } from "express";
import {getDetalleF} from "../controllers/DetalleF.Controller.js"

const router=Router();

 router.post('/DetalleF',getDetalleF);

export default router;