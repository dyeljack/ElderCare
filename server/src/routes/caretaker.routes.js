import { Router } from "express";
import {
    registerCaretaker,
    updateCaretakerProfile,
    toggleForHireStatus
} from "../controllers/caretaker.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { createVerification } from "../controllers/verification.controller.js";
import { sendRequest } from "../controllers/relationship.controller.js";

const router = Router()

router.use(verifyJWT)

router.route("/")
.post(authorizeRole("caretaker"), registerCaretaker)
.patch(authorizeRole("caretaker"), updateCaretakerProfile)

router.route("/forHire").patch(authorizeRole("caretaker"), toggleForHireStatus)

router.route("/addUser/:elderlyNumber").post(authorizeRole("caretaker", "guardian"), sendRequest)

router.route("/verify").post(authorizeRole("caretaker"), createVerification)


export default router