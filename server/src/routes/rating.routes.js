import {Router} from 'express'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { createRating, deleteRating, getCaretakerRatings, updateRating } from '../controllers/rating.controller.js';

const router = Router()

router.use(verifyJWT)

router.route("/:caretakerId")
.post(authorizeRole("elderly"), createRating)
.get(getCaretakerRatings)

router.route("/:ratingId")
.patch(authorizeRole("elderly"), updateRating)
.delete(authorizeRole("elderly"), deleteRating)


export default router