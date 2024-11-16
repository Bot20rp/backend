import {Router} from "express"

import { obtenerUsuariosConDetalles, updateUsuarioG,deleteUsuarioG,obtenerUsuarioPorID} from "../controllers/usuario.controllers.js";
import { verifyToken1 ,verifyToken} from "../controllers/auth.controllers.js";

const router = Router();
// Ruta para registrar un usuario

router.get('/obtener',obtenerUsuariosConDetalles); 
router.patch('/usuario/actualizar',verifyToken1,updateUsuarioG);
router.delete('/usuario/del',verifyToken1,deleteUsuarioG);
router.get('/obtenerPorID',verifyToken,obtenerUsuarioPorID)

export default router;