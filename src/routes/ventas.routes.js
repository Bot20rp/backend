import {Router} from "express"
import {getTipoVenta, crearFactura} from "../controllers/Venta.controllers.js"
import { pdfFactura,getFactura,getFacturaByID } from "../controllers/facturaPDF.controllers.js";

const router = Router();
// Ruta para registrar un usuario

router.get('/getVentas',getTipoVenta); 
router.post('/Factura',crearFactura);
router.get('/pdfF',pdfFactura)
router.get('/getFac',getFacturaByID)
export default router;