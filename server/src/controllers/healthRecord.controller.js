import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { HealthRecord } from "../models/healthRecord.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createHealthRecord = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (
        [title, description].some((field) =>
                field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const fileLocalPath = req.file?.path

    if (fileLocalPath) {

    const file = await uploadOnCloudinary(fileLocalPath)

    if (!file) {
        throw new ApiError(400, "Failed to upload file")
    }
}

    const healthRecord = await HealthRecord.create({
        userId: req.user._id,
        title,
        description,
        file: file?.url,
    })

    return res.status(201).json(
        new ApiResponse(200, createdUser, "Health Record Created successfully")
    )
})

const getHealthRecord = asyncHandler(async(req, res)=>{
    
    return res
    .status(200)
})

export {createHealthRecord}