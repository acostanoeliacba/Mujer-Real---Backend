import { Router } from "express";
import { methods as instructorController } from "./../controllers/instructor.controller";

const router = Router();

router.get("/", instructorController.getAllInstructores);
router.get("/:id", instructorController.getInstructor);
router.post("/", instructorController.addInstructor);
router.put("/:id", instructorController.updateInstructor);
router.delete("/:id", instructorController.deleteInstructor);

export default router;
