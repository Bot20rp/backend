import { Router } from "express";
import { verifyToken1 } from "../controllers/auth.controllers.js";
// import { registerProducto,getProducto,getProductoByID,updateProducto,deleteProducto } from "../controllers/producto.controllers.js";
import { registrarProducto,getProducto,updateProducto,deleteproducto,registerProducto} from "../controllers/productos.controlles.js";
const router=Router();


router.get('/producto',getProducto)
// router.get('/producto',getProductoByID)
router.post('/productoReg',verifyToken1,registerProducto)
router.patch('/producto/actualizar',updateProducto)
router.delete('/producto/delete',deleteproducto)
export default  router;