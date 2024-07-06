import { Router } from "express";
import { methods as categoriasController } from "./../controllers/categorias.controller";

const router = Router();

router.get("/", categoriasController.getAllCategorias);
router.get("/:id", categoriasController.getCategorias);
router.post("/", categoriasController.addCategorias);
router.put("/:id", categoriasController.updateCategorias);
router.delete("/:id", categoriasController.deleteCategorias);

export default router;
