import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Medicine } from "../models/medicine.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createMedicine = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (
        [name, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

        const imageLocalPath = req.files?.image[0]?.path;
        let image;
    
        if(imageLocalPath){
    
           image = await uploadOnCloudinary(imageLocalPath)

           if (!image) {
            throw new ApiError(400, "Failed to upload image")
        }

        }
    
    const medicine = await Medicine.create({
        name,
        image: image?.url,
        description,
        verified: false,
        createdBy: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(200, medicine, "Medicine created successfully")
    )

}

)

export { createMedicine }