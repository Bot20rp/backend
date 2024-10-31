import {Router} from "express"

import { obtenerUsuariosConDetalles, updateUsuarioG,deleteUsuarioG} from "../controllers/usuario.controller.js";
import { verifyToken1 } from "../controllers/auth.controllers.js";

const router = Router();
// Ruta para registrar un usuario

router.get('/obtener',obtenerUsuariosConDetalles); 
router.patch('/usuario/actualizar',verifyToken1,updateUsuarioG);
router.delete('/usuario/del',verifyToken1,deleteUsuarioG);

export default router;