import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Verification } from "../models/verification.model.js";
import { CaretakerProfile } from "../models/caretaker.model.js";


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
        file: file.url
    })

    return res.status(201).json(
        new ApiResponse(201, verification, "Verification request created successfully")
    )
}) 

const verifyCaretaker = asyncHandler(async(req, res) =>{

    const {caretakerId} = req.params

       await CaretakerProfile.findOneAndUpdate(
        {
            _id: caretakerId
        },
        {
            $set:{
                verified: true
            }
        },
        {
            new: true
        }
    )

    await Verification.findOneAndDelete({caretakerId})
    
     return res.status(201).json(
        new ApiResponse(201, "Caretaker Verified successfully")
    )
})

const getUnverifiedCaretakers = asyncHandler(async(req, res) =>{

   const verification = await Verification.aggregate([
        {
            $lookup:{
                from: "users",
                localField: "caretakerId",
                foreignField: "_id",
                as: "users",
                pipeline:[
                           {
                        $project:{
                            refreshToken: 0,
                            role: 0,
                            password: 0,
                        }
                }
                ]
            }
        },
        {
            $lookup:{
                from: "caretakerprofiles",
                localField: "caretakerId",
                foreignField: "userId",
                as: "profile"
            }
        }
    ])

    if(!verification){
        throw new ApiError(404, "caretakers for verifications not found")
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, verification, "caretakers for verification fetched successfully")
    )

})

export {
    createVerification,
    verifyCaretaker,
    getUnverifiedCaretakers
}