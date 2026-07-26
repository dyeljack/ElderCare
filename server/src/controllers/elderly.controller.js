import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ElderlyProfile } from "../models/elderly.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerElderly = asyncHandler(async (req, res) => {
    const { bloodGroup, allergies, mobilityStatus, cognitiveStatus } = req.body;

    if (
        [bloodGroup, mobilityStatus, cognitiveStatus].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }


    const existedUser = await ElderlyProfile.findOne({ userId: req.user._id })

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

    return res.status(201).json(
        new ApiResponse(200, elderly, "Elderly profile registered successfully")
    )

}

)

const getElderlyProfile = asyncHandler(async (req, res) => {

    const profile = await ElderlyProfile.findOne({ userId: req.user._id })

    if (!profile) {
        throw new ApiError(400, "failed to find current user's profile")
    }

    return res
        .status(200)
        .json(200, profile, "current user fetched successfully")
})

const updateElderlyProfile = asyncHandler(async (req, res) => {
    const { bloodGroup, allergies, mobilityStatus, cognitiveStatus } = req.body

    if (!(bloodGroup || allergies || mobilityStatus || cognitiveStatus)) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const profile = await ElderlyProfile.findOneAndUpdate(
        { userId: req.user._id },
        {
            $set: {
                bloodGroup,
                allergies,
                mobilityStatus,
                cognitiveStatus
            }
        },
        { new: true }
    )

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Account details updated successfully"))
})

export {
    registerElderly,
    getElderlyProfile,
    updateElderlyProfile
}