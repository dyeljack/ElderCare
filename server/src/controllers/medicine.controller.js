import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Medicine } from "../models/medicine.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createMedicine = asyncHandler(async (req, res) => {
    const { name, imageURL, description } = req.body;

    if (
        [name, imageURL, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const medicine = await Medicine.create({
        name,
        imageURL,
        description,
        verified: false,
        createdByUser: req.user._id
    })

    const createdMedicine = await Medicine.findById(medicine._id)

    if (!createdMedicine) {
        throw new ApiError(500, "Something went wrong while creating this medicine")
    }

    return res.status(201).json(
        new ApiResponse(200, createdProfile, "Medicine created successfully")
    )

}

)

export { createMedicine }