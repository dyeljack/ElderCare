import { Router } from "express";
import { registerElderly } from "../controllers/elderly.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";

const router = Router()

router.route("/register").post(verifyJWT, authorizeRole("elderly"), registerElderly)

export default router