import { Router } from "express";
import { createCombo ,getCombos,updateCombo} from '../controllers/Combo.controllers.js';
import { verifyToken1 } from "../controllers/auth.controllers.js";

const router=Router();

// Ruta para crear un nuevo combo con sus productos
router.post('/combos',verifyToken1, createCombo);
router.get('/getcombos',getCombos);
router.patch('/updateCombos',verifyToken1,updateCombo); 

export default router;
