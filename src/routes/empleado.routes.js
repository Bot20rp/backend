import { Router } from "express";
import { registerEmpleado,getEmpleado,getEmpleadoById,deleteEmpleado,updateEmpleado } from "../controllers/empleado.controllers.js";
import { verifyToken1 } from "../controllers/auth.controllers.js";
const router=Router();

router.get('/empleado',getEmpleado);
router.get('/empleado/:id',getEmpleadoById);
router.post('/empleadoreg',verifyToken1,registerEmpleado);
router.patch('/empleado/:id',verifyToken1,updateEmpleado);
router.delete('/empleado/:id',verifyToken1,deleteEmpleado);
export default router;