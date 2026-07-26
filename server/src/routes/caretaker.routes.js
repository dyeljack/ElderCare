import { Router } from "express";
import {
    getCaretakerProfile,
    registerCaretaker,
    updateCaretakerProfile,
    updateForHireStatus
} from "../controllers/caretaker.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";

const router = Router()

router.route("/register").post(verifyJWT, authorizeRole("caretaker"), registerCaretaker)

router.route("/get").get(verifyJWT, authorizeRole("caretaker"), getCaretakerProfile)

router.route("/update").post(verifyJWT, authorizeRole("caretaker"), updateCaretakerProfile)

router.route("/forHire").post(verifyJWT, authorizeRole("caretaker"), updateForHireStatus)


export default router