import { getPermisos,updatePermisos,updatePermisos2 } from "../controllers/permisos.controllers.js";
import {Router} from "express"
import { verifyToken1 } from "../controllers/auth.controllers.js";
const router =Router();

router.get('/permisos',getPermisos)
router.patch('/updaPermisos',updatePermisos)
router.patch('/updaPermisos2',verifyToken1,updatePermisos2)
export default router;