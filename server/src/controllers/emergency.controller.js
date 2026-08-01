import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Emergency } from "../models/emergency.model.js";

const createEmergency = asyncHandler(async (req, res) => {
    const { location } = req.body; 

    if (!location.latitute || !location.longitude) {
        throw new ApiError(400, "All fields are required")
    }

    const emergency = await Emergency.create({
        userId: req.user.id,
        location: {
            latitude: location.latitude,
            longitude: location.longitude
        },
        status: "active",
    })

    return res.status(201).json(
        new ApiResponse(200, emergency, "Emergency Created successfully")
    )

})

const updateEmergency = asyncHandler(async(req, res) => {

})

const getEmergency = asyncHandler(async(req, res) =>{

})

const getEmergencyHistory = asyncHandler(async(req, res) =>{

})

export {
    createEmergency,
    updateEmergency,
    getEmergency,
    getEmergencyHistory
}
