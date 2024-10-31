import {Router} from "express"
import {insertarCategoriaPadre,insertarCategoriaHija,modificarCategoriaPorNombre, obtenerCategorias, eliminarCategoriaPorNombre } from "../controllers/categoria.controllers.js";
import { verifyToken1 } from "../controllers/auth.controllers.js";

const router=Router();

router.post('/categoriaHija',verifyToken1,insertarCategoriaHija);
router.post('/categoriaPadre',verifyToken1,insertarCategoriaPadre); 
router.patch('/catmodificar',verifyToken1,modificarCategoriaPorNombre);
router.get('/getCategoria',obtenerCategorias);
router.delete('/DeleteCategoria',verifyToken1,eliminarCategoriaPorNombre);

export default router