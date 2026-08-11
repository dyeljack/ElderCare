import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { HealthRecord } from "../models/healthRecord.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";


const createHealthRecord = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (
        [title, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const fileLocalPath = req.file?.path


    let file
    if (fileLocalPath) {

        file = await uploadOnCloudinary(fileLocalPath)

        if (!file) {
            throw new ApiError(500, "Failed to upload file")
        }
    }

    const healthRecord = await HealthRecord.create({
        userId: req.user._id,
        title,
        description,
        file: file?.url,
    })

    return res.status(201).json(
        new ApiResponse(201, healthRecord, "Health Record Created successfully")
    )
})

const getHealthRecords = asyncHandler(async (req, res) => {

    const record = await HealthRecord.find({userId: req.elderlyId})

    return res
        .status(200)
        .json(
            new ApiResponse(200, record, "health records fetched successfully")
        )
})

const updateHealthRecord = asyncHandler(async (req, res) => {
    const { healthRecordId } = req.params
    const { title, description } = req.body

    const fileLocalPath = req.file?.path

    if (!(title?.trim() || description?.trim() || fileLocalPath)) {
        throw new ApiError(400, "atleast 1 field is required")
    }

    const healthRecord = await HealthRecord.findOne({
        _id: healthRecordId,
        userId: req.user._id
    })

    if (!healthRecord) {
        new ApiError(400, "Health Record not found")
    }

    let file
    if (fileLocalPath) {
        file = await uploadOnCloudinary(fileLocalPath)
        if (!file) {
            new ApiError(500, "failed to upload file")
        }
        await deleteFromCloudinary(healthRecord.file)
    }

    if (title) healthRecord.title = title
    if (description) healthRecord.description = description
    if (file) healthRecord.file = file.url
    await healthRecord.save()

    res
        .status(200)
        .json(
            new ApiResponse(200, healthRecord, "Health Record updated successfully")
        )


})

const deleteHealthRecord = asyncHandler(async (req, res) => {

      const { healthRecordId } = req.params

      const healthRecord = await HealthRecord.findOneAndDelete({
         _id: healthRecordId,
        userId: req.user._id
      })

      res
      .status(200)
      .json(
        new ApiResponse(200, `Health Record ${healthRecord.title} got deleted successfully`)
      )
})


export {
    createHealthRecord,
    getHealthRecords,
    updateHealthRecord,
    deleteHealthRecord
}