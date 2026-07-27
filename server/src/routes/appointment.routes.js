import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";
import { createAppointment, updateAppointment } from "../controllers/appointment.controller.js";

const router = Router()

router.route("/create").post(verifyJWT, authorizeRelation, createAppointment)
router.route("/update").post(verifyJWT, authorizeRelation, updateAppointment)

export default router