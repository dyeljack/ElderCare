import { Router } from "express";
import { registerElderly } from "../controllers/elderly.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(verifyJWT, registerElderly)

export default router