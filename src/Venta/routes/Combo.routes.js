import { Router } from "express";
import { prueba,createCombo ,getCombos,updateCombo} from '../controllers/Combo.controllers.js';
import { verifyToken1 } from "../../AdministrarUsuario/controllers/auth.controllers.js";
import { fileUpload } from "../../middleware/image.js";

const router=Router();
router.post('/combosImage',fileUpload,prueba)
// Ruta para crear un nuevo combo con sus productos
router.post('/combos',verifyToken1,fileUpload, createCombo);
router.get('/getcombos',getCombos);
router.patch('/updateCombos',verifyToken1,updateCombo); 

export default router;
