import {Router} from "express"
import { getVolumen } from "../controllers/Volumen.controllers.js"

const router = Router();

router.get('/getVolumen',getVolumen); 
export default router;