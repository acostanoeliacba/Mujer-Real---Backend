import { Router } from "express";
import { methods as cursosController } from "./../controllers/cursos.controller";

const router = Router();

router.get("/", cursosController.getAllCursos);
router.get("/:id", cursosController.getCursos);
router.post("/", cursosController.addCursos);
router.put("/:id", cursosController.updateCursos);
router.delete("/:id", cursosController.deleteCursos);

export default router;
