import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserById,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserAvatar
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteRelation, getPendingRequest, getRelatedUser } from "../controllers/relationship.controller.js";

const router = Router()

router.route("/register").post(upload.single("avatar"), registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").patch(verifyJWT, changeCurrentPassword)

router.route("/get").get(verifyJWT, getCurrentUser)
router.route("/update").patch(verifyJWT, updateAccountDetails)

router.route("/change-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router.route("/getUserById/:userId").get(verifyJWT, getUserById)

router.route("/pendingRequest").get(verifyJWT, getPendingRequest)
router.route("/deleteRelation/:relationId").delete(verifyJWT, deleteRelation)
router.route("/relatedUsers").get(verifyJWT, getRelatedUser)

export default router