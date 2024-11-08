import { Router } from "express";
import { tarjet } from "../controllers/stripe.constrollers.js";

const router = Router();

router.post('/pagoTarget',tarjet);
export default router;