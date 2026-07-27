import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Verification } from "../models/verification.model.js";


const createVerification = asyncHandler(async (req, res) => {
    const { documentType } = req.body;

    const fileLocalPath = req.file?.path

    if (!documentType || !fileLocalPath) {
        throw new ApiError(400, "All fields are required")
    }
    
     const file = await uploadOnCloudinary(fileLocalPath)

    if (!file) {
        throw new ApiError(500, "Failed to upload file")
    }

    const existingVerification = await Verification.findOne({caretakerId: req.user._id})

    if(existingVerification){
        throw new ApiError(400, "a verification request already exists")
    }

    const verification = await Verification.create({
        caretakerId: req.user._id,
        documentType,
        file: file.url,
        status: "pending",
    })

    return res.status(201).json(
        new ApiResponse(200, verification, "Verification request created successfully")
    )
}) 

export {createVerification}