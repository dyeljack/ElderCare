import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ElderlyProfile } from "../models/elderly.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerElderly = asyncHandler(async (req, res) => {
    const { bloodGroup, allergies, mobilityStatus, cognitiveStatus } = req.body;
    console.log(req.user._id, req.user.role)

    if(req.user.role != "elderly"){
        throw new ApiError(400, "you must be an elderly to use this api")
    }

    if (
        [bloodGroup, allergies, mobilityStatus, cognitiveStatus].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }


    const existedUser = await ElderlyProfile.findOne(req.user._id)

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const elderly = await ElderlyProfile.create({
        userId: req.user._id,
        bloodGroup,
        allergies,
        mobilityStatus,
        cognitiveStatus
    })

    const createdProfile = await ElderlyProfile.findById(elderly._id)

    if (!createdProfile) {
        throw new ApiError(500, "Something went wrong while registering the profile")
    }

    return res.status(201).json(
        new ApiResponse(200, createdProfile, "Elderly profile registered successfully")
    )

}

)

export { registerElderly }