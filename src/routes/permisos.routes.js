import { getPermisos,updatePermisos } from "../controllers/permisos.controller.js";
import {Router} from "express"
const router =Router();

router.get('/permisos',getPermisos)
router.patch('/updaPermisos',updatePermisos)
router.patch('/updaPermisos2',updatePermisos)
export default router;