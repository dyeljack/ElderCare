import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const assignmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    caretakerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
},{timestamps: true})


export const Assignment = mongoose.model("Assignment", assignmentSchema)