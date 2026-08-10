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

router.use(verifyJWT, authorizeRelation)

router.route("/:elderlyId")
    .post(createAppointment)
    .get(getUserAppointments);

router.route("/:appointmentId")
    .patch(updateAppointment)
    .delete(deleteAppointment);

router.route("/history/:elderlyId").get(getAppointmentHistory)

export default router