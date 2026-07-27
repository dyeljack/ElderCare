import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { CaretakerProfile } from "../models/caretaker.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerCaretaker = asyncHandler(async (req, res) => {
    const { language, yoe, skills } = req.body;

    if (!yoe || language.length === 0 || skills?.trim() === ""
    ) {
        throw new ApiError(400, "All fields are required")
    }


    const existedUser = await CaretakerProfile.findOne({ userId: req.user._id })

    if (existedUser) {
        throw new ApiError(409, "Caretaker already exists");
    }

    const caretaker = await CaretakerProfile.create({
        userId: req.user._id,
        verified: false,
        forHire: false,
        language,
        yoe,
        skills
    })

    return res.status(201).json(
        new ApiResponse(200, caretaker, "Caretaker profile registered successfully")
    )

})

const getCaretakerProfile = asyncHandler(async (req, res) => {

    const profile = await CaretakerProfile.findOne({ userId: req.user._id })

    if (!profile) {
        throw new ApiError(400, "failed to find current user's profile")
    }

    return res
        .status(200)
        .json(
           new ApiResponse(200, profile, "current user fetched successfully")
        )
})

const updateCaretakerProfile = asyncHandler(async (req, res) => {
    const { language, yoe, skills } = req.body

    if (!(language || yoe || skills)) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const profile = await CaretakerProfile.findOneAndUpdate(
        { userId: req.user._id },
        {
            $set: {
                language,
                yoe,
                skills
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

const updateForHireStatus = asyncHandler(async (req, res)=>{
    
    if (typeof req.body.forHire !== "boolean") {
  throw new ApiError(400, "forHire must be a boolean");
}

    const profile = await CaretakerProfile.findOne({userId: req.user._id})

       if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    if(!profile.verified){
        throw new ApiError(403, "you must be verified in order to change for-Hire status")
    }

    profile.forHire = req.body.forHire
    await profile.save({ validateBeforeSave: false }) 

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "forHire status updated successfully" ))
})

export {
    registerCaretaker,
    getCaretakerProfile,
    updateCaretakerProfile,
    updateForHireStatus
}