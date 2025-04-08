import { Router } from "express";
import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createTodo);
router.route("/").get(verifyJWT, getTodos);
router.route("/:id").get(verifyJWT, getTodoById);
router.route("/:id").put(verifyJWT, updateTodo);
router.route("/:id").delete(verifyJWT, deleteTodo);

export default router;
