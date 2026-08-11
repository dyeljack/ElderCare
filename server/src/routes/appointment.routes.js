import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";
import {
    createAppointment,
    deleteAppointment,
    getAppointmentHistory,
    getUserAppointments,
    updateAppointment
} from "../controllers/appointment.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/:elderlyId")
    .post(authorizeRelation, createAppointment)
    .get(authorizeRelation, getUserAppointments);

router.route("/:elderlyId/:appointmentId")
    .patch(authorizeRelation, updateAppointment)
    .delete(authorizeRelation, deleteAppointment);

router.route("/history/:elderlyId").get(getAppointmentHistory)

export default router