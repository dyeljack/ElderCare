import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Medicine } from "../models/medicine.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const createMedicine = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (
        [name, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const imageLocalPath = req.file?.path;
    let image;

    if (imageLocalPath) {

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
        new ApiResponse(201, medicine, "Medicine created successfully")
    )

}

)

const getMedicineById = asyncHandler(async (req, res) => {

    const { medicineId } = req.params

    const medicine = await Medicine.findById(medicineId)

    res
        .status(200)
        .json(
            new ApiResponse(200, medicine, "medicine fetched successfully")
        )

})

const getAllMedicines = asyncHandler(async (req, res) => {

    const medicine = await Medicine.find({})

    res
        .status(200)
        .json(
            new ApiResponse(200, medicine, "all medicines fetched successfully")
        )

})

const deleteMedicine = asyncHandler(async (req, res) => {

    const { medicineId } = req.params

    const medicine = await Medicine.findById(medicineId)

    if (medicine.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        throw new ApiError(403, "you are not authorized to delete this medicine")
    }


    await medicine.deleteOne()
    if (medicine.image) await deleteFromCloudinary(medicine.image)

    res
        .status(200)
        .json(
            new ApiResponse(200, `medicine ${medicine.name} deleted successfully`)
        )


})

export {
    createMedicine,
    getMedicineById,
    getAllMedicines,
    deleteMedicine
}