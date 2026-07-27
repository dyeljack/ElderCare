import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    caretakerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        trim: true
    }
}, { timestamps: true })


export const Rating = mongoose.model("Rating", ratingSchema)