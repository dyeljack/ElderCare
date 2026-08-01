import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Relationship } from "../models/relationship.model.js";

const createRelation = asyncHandler(async (req, res) => {
    const { elderlyNumber, startDate, endDate } = req.body;

    if (elderlyNumber.trim() === "") {
        throw new ApiError(400, "Elderly Phone Number is required")
    }

    const elderly = await User.findOne({ phoneNumber: elderlyNumber })

    if (!elderly || elderly.role !== "elderly") {
        throw new ApiError(400, "this elderly does not exist")
    }

    const existingRelation = await Relationship.findOne({
        relatedUserId: req.user._id,
        elderlyId: elderly._id,
        status: { $in: ["active", "pending"] }
    })
    if (existingRelation) {
        throw new ApiError(403, "you are already have a request to this user")
    }

    const relation = await Relationship.create({
        elderlyId: elderly._id,
        relatedUserId: req.user._id,
        type: req.user.role,
        startDate,
        endDate,
        status: "pending"
    })

    return res.status(201).json(
        new ApiResponse(200, relation, "Request sent successfully")
    )

})

const updateRelation = asyncHandler(async (req, res) => {
    const { isAccepted, relatedUserId } = req.body

    if (relatedUserId.trim() === "") {
        throw new ApiError(400, "related user Id not provided")
    }

    if (!isAccepted) {
        throw new ApiError(400, "isAccepted is false or not provided")
    }

    const relation = await Relationship.findOne({
        relatedUserId: relatedUserId,
        elderlyId: req.user_id,
        status: "pending"
    })
    if (!relation) {
        throw new ApiError(403, "No pending request with this user found")
    }

    relation.status = "active"
    relation.save()

    res
        .status(200)
        .json(
            new ApiResponse(200, relation, "Request accepted Successfully")
        )
})

const deleteRelation = asyncHandler(async (req, res) => {

})

const getOutgoingRelations = asyncHandler(async(req, res) =>{
    
})

const getIncomingRelations = asyncHandler(async(req, res) =>{
    
})

export {
    createRelation,
    updateRelation,
    deleteRelation,
    getOutgoingRelations,
    getIncomingRelations
}