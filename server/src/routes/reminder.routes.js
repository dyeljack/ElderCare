import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";
import { createReminder, updateReminder } from "../controllers/reminder.controller.js";

const router = Router()

router.route("/create").post(verifyJWT, authorizeRelation, createReminder)
router.route("/update").post(verifyJWT, authorizeRelation, updateReminder)

export default router