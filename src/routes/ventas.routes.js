import {Router} from "express"
import {getTipoVenta, crearFactura} from "../controllers/Venta.Controller.js"


const router = Router();
// Ruta para registrar un usuario

router.get('/getVentas',getTipoVenta); 
router.post('/Factura',crearFactura);

export default router;