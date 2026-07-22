import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";
import { createReminder } from "../controllers/reminder.controller.js";

const router = Router()

router.route("/create").post(verifyJWT, authorizeRelation, createReminder)

export default router