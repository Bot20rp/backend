import { Router } from "express";
import { tarjet } from "../controllers/stripe.constrollers";

const router = Router();

router.post('/pagoTarget',tarjet);
export default router;