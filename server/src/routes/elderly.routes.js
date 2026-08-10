import { Router } from "express";
import { registerElderly, updateElderlyProfile } from "../controllers/elderly.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { acceptRequest } from "../controllers/relationship.controller.js";

const router = Router()

router.use(verifyJWT, authorizeRole("elderly"))

router.route("/")
.post(registerElderly)
.patch(updateElderlyProfile)

router.route("/accept/:relationId").patch(acceptRequest)

export default router