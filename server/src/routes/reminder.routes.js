import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeToken } from "../middlewares/authorizeRole.middleware.js";
import { authorizeRelation } from "../middlewares/authorizeRelation.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT, authorizeRelation, registerElderly)

export default router