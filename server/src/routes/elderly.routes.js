import { Router } from "express";
import { getElderlyProfile, registerElderly, updateElderlyProfile } from "../controllers/elderly.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { updateRelation } from "../controllers/relationship.controller.js";

const router = Router()

router.use(verifyJWT, authorizeRole("elderly"))

router.route("/register").post(registerElderly)
router.route("/get").get(getElderlyProfile)
router.route("/update").patch(updateElderlyProfile)

router.route("/acceptUser").patch(updateRelation)

export default router