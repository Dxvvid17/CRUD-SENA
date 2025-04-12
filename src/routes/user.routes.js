import Router from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { adminRequired } from "../middlewares/adminRequired.js";

const router = Router();

router.get("/users", adminRequired, getAllUsers);
router.get("/users/:id", adminRequired, getUserById);
router.put("/users/:id", adminRequired, updateUser);
router.delete("/users/:id", adminRequired, deleteUser);

export default router;
