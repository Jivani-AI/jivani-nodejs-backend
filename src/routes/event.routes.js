import { Router } from "express";
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.route("/").get(getEvents);
router.route("/:id").get(getEventById);
router.route("/create").post(createEvent);
router.route("/:id").put(updateEvent);
router.route("/:id").delete(deleteEvent);

export default router;
