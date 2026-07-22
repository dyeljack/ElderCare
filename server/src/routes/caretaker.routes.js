import { Router } from "express";
import { registerCaretaker } from "../controllers/caretaker.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";

const router = Router()

router.route("/register").post(verifyJWT, authorizeRole("caretaker") , registerCaretaker)

export default router