import { Router } from "express";
import {
    createShoppingList,
    getShoppingLists,
    getShoppingListById,
    updateShoppingList,
    deleteShoppingList,
    addItemToShoppingList,
    updateShoppingItem,
    deleteShoppingItem,
} from "../controllers/shopping.controller.js";

const router = Router();

router.route("/create").post(createShoppingList);
router.route("/").get(getShoppingLists);
router.route("/:id").get(getShoppingListById);
router.route("/:id").put(updateShoppingList);
router.route("/:id").delete(deleteShoppingList);
router.route("/:id/items").post(addItemToShoppingList);
router.route("/:id/items/:itemIndex").put(updateShoppingItem);
router.route("/:id/items/:itemIndex").delete(deleteShoppingItem);

export default router;
