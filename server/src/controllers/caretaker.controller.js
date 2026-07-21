import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { CaretakerProfile } from "../models/caretaker.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerCaretaker = asyncHandler(async (req, res) => {
    const { language, yoe, skills } = req.body;

    if ( !yoe || language.length === 0  || skills?.trim() === ""
    ) {
        throw new ApiError(400, "All fields are required")
    }


    const existedUser = await CaretakerProfile.findOne({userId: req.user._id})

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

    const createdProfile = await CaretakerProfile.findById(caretaker._id)

    if (!createdProfile) {
        throw new ApiError(500, "Something went wrong while registering the profile")
    }

    return res.status(201).json(
        new ApiResponse(200, createdProfile, "Caretaker profile registered successfully")
    )

}

)

export { registerCaretaker }