import { Router } from "express";
import {
    createReminder,
    getReminders,
    getReminderById,
    updateReminder,
    deleteReminder,
    deleteAllReminders,
} from "../controllers/reminder.controller.js";

const router = Router();

router.route("/create").post(createReminder);
router.route("/").get(getReminders);
router
    .route("/:id")
    .get(getReminderById)
    .put(updateReminder)
    .delete(deleteReminder);
router.route("/deleteAll").delete(deleteAllReminders);

export default router;
