import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";
import { createReminder, deleteReminder, getReminderHistory, getUserReminders, updateReminder } from "../controllers/reminder.controller.js";

const router = Router()

router.use(verifyJWT, authorizeRelation)

router.route("/:elderlyId")
    .post(createReminder)
    .get(getUserReminders);

router.route("/:reminderId")
    .patch(updateReminder)
    .delete(deleteReminder);

router.route("/history/:elderlyId").get(getReminderHistory)

export default router