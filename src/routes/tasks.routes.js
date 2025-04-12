import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  updateTasks,
  deleteTasks,
  createTasks,
} from "../controllers/tasks.controller.js";
import { taskSchema } from "../schemas/task.scheme.js";
import { validateSchema } from "../middlewares/validator.middlewar.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired, validateSchema(taskSchema), createTasks);
router.delete("/tasks/:id", authRequired, deleteTasks);
router.put("/tasks/:id", authRequired, updateTasks);

export default router;
