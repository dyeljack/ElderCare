import { Router } from "express";
import { getElderlyProfile, registerElderly, updateElderlyProfile } from "../controllers/elderly.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { createHealthRecord } from "../controllers/healthRecord.controller.js";
import { updateRelation } from "../controllers/relationship.controller.js";

const router = Router()

router.route("/register").post(verifyJWT, authorizeRole("elderly"), registerElderly)

router.route("/get").get(verifyJWT, authorizeRole("elderly"), getElderlyProfile)

router.route("/update").post(verifyJWT, authorizeRole("elderly"), updateElderlyProfile)

router.route("/createHealthRecord").post(verifyJWT, authorizeRole("elderly"), createHealthRecord)

router.route("/acceptUser").post(verifyJWT, authorizeRole("elderly"), updateRelation)

export default router