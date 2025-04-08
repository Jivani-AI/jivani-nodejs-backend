import { Router } from "express";
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.route("/create").post(createEvent);
router.route("/").get(getEvents);
router.route("/:id").get(getEventById).put(updateEvent).delete(deleteEvent);

export default router;
