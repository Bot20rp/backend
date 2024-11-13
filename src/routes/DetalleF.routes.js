import { Router } from "express";
import {getDetalleF,anularFactura} from "../controllers/DetalleF.Controller.js"

const router=Router();

 router.post('/DetalleF',getDetalleF);
 router.patch('/anularF',anularFactura);

export default router;