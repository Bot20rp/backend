import { Router } from "express";
import { createCombo ,getCombos} from '../controllers/Combo.controllers.js';

const router=Router();

// Ruta para crear un nuevo combo con sus productos
router.post('/combos', createCombo);
router.get('/getcombos',getCombos);

export default router;
