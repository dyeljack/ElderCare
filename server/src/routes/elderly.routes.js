import { Router } from "express";
import { registerElderly } from "../controllers/elderly.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(registerElderly)

export default router