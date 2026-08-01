import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";

const createAppointment = asyncHandler(async (req, res) => {
    const { title, description, time, location, address } = req.body; // elderly Id from middleware

    if (
        [title, description, address].some((field) =>
            field?.trim() === "") || !location.latitute || !location.longitude || !time
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const appointment = await Appointment.create({
        userId: req.elderlyId,
        title,
        description,
        time,
        location: {
            latitude: location.latitude,
            longitude: location.longitude
        },
        address,
        status: "active",
        createdBy: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(200, appointment, "Appointment Created successfully")
    )

})

const updateAppointment = asyncHandler(async (req, res) => {
    const { title, description, time, location, address } = req.body 

    if (!(title || description || time || location.latitude || location.longitude || address)) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const appointment = await Appointment.findOneAndUpdate(
        { userId: req.elderlyId },
        {
            $set: {
                title,
                description,
                time,
                location:{
                    latitude: location.latitude,
                    longitude: location.longitude
                },
                address,
                createdBy: req.user._id
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, appointment, "Appointment updated successfully"))
})

const deleteAppointment = asyncHandler(async(req,res) =>{

})

const getUserAppointments = asyncHandler(async(req, res)=>{

})

const getAppointmentHistory = asyncHandler(async(req, res)=>{

})

export {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getUserAppointments,
    getAppointmentHistory
}
