import { Router } from "express";
import { createCombo } from '../controllers/Combo.controllers.js';

const router=Router();

// Ruta para crear un nuevo combo con sus productos
router.post('/combos', createCombo);

export default router;
