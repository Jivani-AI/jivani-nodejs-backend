import { Router } from "express";
import { createNote,  getNotes, getNote, updateNote, toggleNotePin, deleteNote, addBlock, updateBlock, deleteBlock} from "../controllers/note.controller.js";

const router = Router();

router.route("/create").post(createNote);
router.route("/").get(getNotes);
router.route("/:id").get(getNote);
router.route("/:id").put(updateNote);
router.route("/:id").delete(deleteNote);
router.route("/:id/togglePin").put(toggleNotePin);
router.route("/:id/block").post(addBlock);
router.route("/:id/block").put(updateBlock);
router.route("/:id/block").delete(deleteBlock);

export default router;