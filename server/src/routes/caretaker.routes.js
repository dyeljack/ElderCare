import { Router } from "express";
import {
    registerCaretaker,
    updateCaretakerProfile,
    toggleForHireStatus,
    addTimeslot,
    updateTimeslot
} from "../controllers/caretaker.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { createVerification } from "../controllers/verification.controller.js";
import { sendRequest } from "../controllers/relationship.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.use(verifyJWT)

router.route("/")
.post(authorizeRole("caretaker"), registerCaretaker)
.patch(authorizeRole("caretaker"), updateCaretakerProfile)

router.route("/timeslot")
.post(authorizeRole("caretaker"), addTimeslot)

router.route("/timeslot/:timeslotId")
.patch(authorizeRole("caretaker"), updateTimeslot)

router.route("/forHire").patch(authorizeRole("caretaker"), toggleForHireStatus)

router.route("/addUser/:elderlyNumber").post(authorizeRole("caretaker", "guardian"), sendRequest)

router.route("/verify").post(authorizeRole("caretaker"), upload.single("file"), createVerification)


export default router