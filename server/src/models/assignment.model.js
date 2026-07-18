import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import { Timestamp } from "mongodb";
import { timeStamp } from "console";

const assignmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    caretakerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    startDate: {
        type: timeStamp,
        required: true,
    },
    endDate: {
        type: timeStamp,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
},{timestamps: true})


export const Assignment = mongoose.model("Assignment", assignmentSchema)