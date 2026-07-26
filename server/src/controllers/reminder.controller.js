import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Reminder } from "../models/reminder.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createReminder = asyncHandler(async (req, res) => {
    const { time, startDate, endDate, frequency, dosage } = req.body; // elderly Id from middleware

    if (
        [medicineId, frequency, dosage].some((field) =>
            field?.trim() === "") || time.length === 0 || !startDate || !endDate || days.length === 0
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const reminder = await Reminder.create({
        userId: req.elderlyId,
        time,
        startDate,
        endDate,
        frequency,
        dosage,
        createdBy: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(200, createdProfile, "Reminder Created successfully")
    )

})

const updateReminder = asyncHandler(async (req, res) => {
    const { time, startDate, endDate, frequency, dosage } = req.body 

    if (!(time || startDate || endDate || frequency || dosage)) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const reminder = await Reminder.findOneAndUpdate(
        { userId: req.elderlyId },
        {
            $set: {
                time,
                startDate,
                endDate,
                frequency,
                dosage,
                createdBy: req.user._id
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, reminder, "reminder updated successfully"))
})

export {
    createReminder,
    updateReminder
}
