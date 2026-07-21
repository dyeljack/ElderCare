import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Reminder } from "../models/reminder.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createReminder = asyncHandler(async (req, res) => {
    const { elderlyId, medicineId, time, startDate, endDate, frequency, days, dosage } = req.body;

    if ( 
        [medicineId, frequency, dosage].some((field) =>
            field?.trim() === "") || time.length === 0 || !startDate || !endDate || days.length === 0
    ) {
        throw new ApiError(400, "All fields are required")
    }

    if(req.user.role === "elder"){
       const userId = req.user._id
    }

    const reminder = await Reminder.create({
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

export { createReminder }