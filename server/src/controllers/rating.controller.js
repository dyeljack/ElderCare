import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Rating } from "../models/rating.model.js";
import { Relationship } from "../models/relationship.model.js";

const createRating = asyncHandler(async (req, res) => {
    const { caretakerId, rating, review } = req.body; // rating can be anything 1 to 5 (only 0.5 allowed in decimals)

    if (caretakerId.trim() !== "" || !rating) {
        throw new ApiError(400, "All fields are required")

    }

    const relation = await Relationship.findOne({
        relatedUserId: caretakerId,
        elderlyId: req.user_id,
        status: { $in: ["active", "completed"] },
        type: "caretaker"
    }
    )

    if (!relation) {
        throw new ApiError(401, "You are not authorized to rate this caretaker")
    }

    const rating = await Rating.findOneAndUpdate(
        { caretakerId },
        {
            $set: {
                caretakerId,
                createdBy: req.user._id,
                rating,
                review
            }
        }, {
        new: true,
        upsert: true
    })

    return res.status(201).json(
        new ApiResponse(201, rating, "Rating created successfully")
    )

}

)

const updateRating = asyncHandler(async (req, res) => {

    const { ratingId } = req.params
    const { rating, review } = req.body

    if (!(rating?.trim() || review?.trim())) {
        throw new ApiError(400, "atleast 1 field is required")
    }

    const rating = await Rating.findOneAndUpdate(
        {
            _id: ratingId,
            createdBy: req.user._id
        },
        {
            $set: {
                rating,
                review
            }
        },
        { new: true }
    )

    return res.status(200).json(
        new ApiResponse(200, rating, "Rating updated successfully")
    )
})

const deleteRating = asyncHandler(async (req, res) => {

    const { ratingId } = req.params

    const rating = await Rating.findOneAndDelete({
        _id: ratingId,
        createdBy: req.user._id
    })

    return res.status(200).json(
        new ApiResponse(200, rating, `Rating \"${rating.review}\" deleted successfully`)
    )
})

const getCaretakerRatings = asyncHandler(async (req, res) => {

    const { caretakerId } = req.params

    const rating = await Rating.find({ caretakerId })

    return res.status(200).json(
        new ApiResponse(200, rating, "Ratings fetched successfully")
    )


})

export {
    createRating,
    updateRating,
    deleteRating,
    getCaretakerRatings
}