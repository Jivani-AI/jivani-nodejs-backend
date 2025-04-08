import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getTransactions);
router.route("/create").post(verifyJWT, createTransaction);
router.route("/:id").get(verifyJWT, getTransactionById);
router.route("/:id").put(verifyJWT, updateTransaction);
router.route("/:id").delete(verifyJWT, deleteTransaction);

export default router;
