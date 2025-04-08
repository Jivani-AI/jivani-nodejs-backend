import { Router } from 'express';
import { getHabit, getHabits, createHabit, updateHabit, deleteHabit, addHabitLog,  deleteHabitLog, updateHabitLog } from '../controllers/habit.controller.js';

const router = Router();

router.route("/create").post(createHabit);
router.route("/").get(getHabits);
router.route("/:id").get(getHabit).put(updateHabit).delete(deleteHabit);
router.route("/log/add/:id").post(addHabitLog);
router.route("/log/delete/:id").delete(deleteHabitLog);
router.route("/log/update/:id").put(updateHabitLog);

export default router;
