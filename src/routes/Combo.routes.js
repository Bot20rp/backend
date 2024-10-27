import { Router } from "express";
import { createCombo ,getCombos,updateCombo} from '../controllers/Combo.controllers.js';

const router=Router();

// Ruta para crear un nuevo combo con sus productos
router.post('/combos', createCombo);
router.get('/getcombos',getCombos);
router.patch('/updateCombos',updateCombo); 

export default router;
