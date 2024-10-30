import {Router} from "express";
import { getLote,createLote,updateLote,deleteLote } from "../controllers/lote.controllers.js";
const router=Router();

router.get('/lote',getLote)
router.post('/lote',createLote)
router.patch('/updLote',updateLote)
// router.delete('/delLote',deleteLote)
export default router
