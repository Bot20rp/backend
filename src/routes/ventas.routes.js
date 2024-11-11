import {Router} from "express"
import {getTipoVenta} from "../controllers/Venta.Controller.js"


const router = Router();
// Ruta para registrar un usuario

router.get('/getVentas',getTipoVenta); 

export default router;