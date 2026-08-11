import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Relationship } from "../models/relationship.model.js";

const sendRequest = asyncHandler(async (req, res) => {

    const { elderlyNumber } = req.params
    const { startDate = null, endDate = null } = req.body || {};

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
        new ApiResponse(201, relation, "Request sent successfully")
    )

})

const acceptRequest = asyncHandler(async (req, res) => {

    const { relationId } = req.params

    if (relationId.trim() === "") {
        throw new ApiError(400, "relation Id not provided")
    }

    const relation = await Relationship.findOneAndUpdate(
        {
            _id: relationId,
            status: "pending"
        },
        {
            $set: {
                status: "active"
            }
        },
        {
            new: true
        }
    )

    res
        .status(200)
        .json(
            new ApiResponse(200, relation, "Request accepted Successfully")
        )
})

const deleteRelation = asyncHandler(async (req, res) => {

    const { relationId } = req.params

    const userId = req.user.role === "elderly"
        ? "elderlyId"
        : "relatedUserId";


    const relation = await Relationship.findOneAndDelete({
        [userId]: req.user._id,
        status: { $in: ["active", "pending"] }
    })

    res
        .status(200)
        .json(
            new ApiResponse(200, relation, "relation deleted Successfully")
        )
})

const getPendingRequest = asyncHandler(async (req, res) => {

    const userId = req.user.role === "elderly"
        ? "elderlyId"
        : "relatedUserId";

     const relatedUserId = req.user.role === "elderly"
       ? "relatedUserId"
        : "elderlyId";    

    const relation = await Relationship.aggregate([
        {
            $match: {
                [userId]: req.user._id,
                status: "pending"
            }
        },
        {
            $lookup:{
                from: "users",
                localField: relatedUserId,
                foreignField: "_id",
                as: "user",
                pipeline:[
                           {
                        $project:{
                            firstName:1,
                            lastName:1,
                            avatar:1,
                            role:1,
                        }
                }
                ]
            }
        },
        {
            $project:{
                _id: 1,
                startDate:1,
                endDate:1,
                createdAt:1,
                user: 1
            }
        },
    ])

    if (!relation) {
        throw new ApiError(404, "no pending requests found")
    }

    res
        .status(200)
        .json(
            new ApiResponse(200, relation, "pending requests fetched successfully")
        )

})

const getRelatedUser = asyncHandler(async (req, res) => {

    const userId = req.user.role === "elderly"
        ? "elderlyId"
        : "relatedUserId";

    const relation = await Relationship.find({
        [userId]: req.user._id,
        status: "active"
    });

    if (!relation) {
        throw new ApiError(404, "no related users found")
    }

    const field = req.user.role === "elderly"
        ? "relatedUserId"
        : "elderlyId";

    const userIds = relation.map(item => item[field]);

    const relatedUsers = await User.find({
        _id: { $in: userIds }
    }).select("firstName lastName avatar")

    res
        .status(200)
        .json(
            new ApiResponse(200, relatedUsers, "related elders fetched successfully")
        )

})

export {
    sendRequest,
    deleteRelation,
    acceptRequest,
    getPendingRequest,
    getRelatedUser
}