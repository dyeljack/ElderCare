import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT, authorizeRole("elderly"), registerElderly)

router.route("/resolve").get(verifyJWT, authorizeRole("elderly"), getElderlyProfile)

export default router