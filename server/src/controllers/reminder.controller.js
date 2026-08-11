import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Reminder } from "../models/reminder.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Medicine } from "../models/medicine.model.js";
import mongoose from "mongoose";

const createReminder = asyncHandler(async (req, res) => {
    const { time, startDate, endDate, frequency, dosage, medicineId } = req.body; // elderly Id from middleware

    if (
        [medicineId, frequency, dosage].some((field) =>
            field?.trim() === "") || time.length === 0 || !startDate || !endDate
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const medicine = await Medicine.findById(medicineId)

    if (!medicine) {
        throw new ApiError(404, "medicine Id invalid")
    }

    const reminder = await Reminder.create({
        userId: req.elderlyId,
        time,
        startDate,
        endDate,
        frequency,
        dosage,
        status: "active",
        medicineId,
        createdBy: req.user._id
    })

    const result = { reminder, medicine }

    return res.status(201).json(
        new ApiResponse(201, result, "Reminder Created successfully")
    )

})

const updateReminder = asyncHandler(async (req, res) => {

    const { reminderId } = req.params
    const { time, startDate, endDate, frequency, dosage } = req.body

    if (!(time || startDate || endDate || frequency || dosage)) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const reminder = await Reminder.findOneAndUpdate(
        {
            _id: reminderId,
            status: "active"
        },
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

const getUserReminders = asyncHandler(async (req, res) => {

    const reminder = await Reminder.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(req.elderlyId)
            }
        },
        {
            $lookup: {
                from: "medicines",
                localField: "medicineId",
                foreignField: "_id",
                as: "medicine"
            }
        },
        {
            $unwind: "$medicine"
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, reminder, "reminders fetched successfully"))
})

const deleteReminder = asyncHandler(async (req, res) => {

    const { reminderId } = req.params

    const reminder = await Reminder.findByIdAndDelete(reminderId)

    if(!reminder){
        throw new ApiError(404, "invalid reminder Id")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, reminder, "reminder deleted successfully"))
})

const getReminderHistory = asyncHandler(async (req, res) => {

})

export {
    createReminder,
    updateReminder,
    getUserReminders,
    deleteReminder,
    getReminderHistory
}
