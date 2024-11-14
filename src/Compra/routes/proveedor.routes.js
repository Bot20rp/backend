import { Router } from "express";
import { registrarProveedor,getProveedor,getProveedorById,updateProveedor,deleteProveedor,getProveedorIdByName} from "../controllers/proveedor.controllers.js";
import { authenticateToken } from "../../AdministrarUsuario/controllers/auth.controllers.js";
const router=Router();
//CRUD
router.get('/proveedor',getProveedor);
router.get('/proveedor/:id',getProveedorById);
router.post('/proveedor',authenticateToken,registrarProveedor);
router.post('/proveedor/ex',getProveedorIdByName);
router.patch('/proveedor/update',authenticateToken,updateProveedor);
router.delete('/proveedor/delete',authenticateToken,deleteProveedor);

export default router;