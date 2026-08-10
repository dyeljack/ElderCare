import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";
import { createHealthRecord, deleteHealthRecord, getHealthRecords, updateHealthRecord } from "../controllers/healthRecord.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/")
.post(authorizeRole("elderly"), createHealthRecord)

router.route("/:healthRecordId")
.patch(authorizeRole("elderly"), updateHealthRecord)
.delete(authorizeRole("elderly"), deleteHealthRecord)

router.route("/:elderlyId").get(authorizeRelation, getHealthRecords)




export default router