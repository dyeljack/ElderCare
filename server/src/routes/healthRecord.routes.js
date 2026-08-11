import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";
import { createHealthRecord, deleteHealthRecord, getHealthRecords, updateHealthRecord } from "../controllers/healthRecord.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.use(verifyJWT)

router.route("/")
.post(authorizeRole("elderly"),upload.single("file"), createHealthRecord)

router.route("/:healthRecordId")
.patch(authorizeRole("elderly"),upload.single("file"), updateHealthRecord)
.delete(authorizeRole("elderly"), deleteHealthRecord)

router.route("/:elderlyId").get(authorizeRelation, getHealthRecords)




export default router