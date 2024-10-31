import {Router} from "express"
import { getVolumen } from "../controllers/volumen.controllers.js"

const router = Router();

router.get('/getVolumen',getVolumen); 
export default router;