import mongoose, { Schema } from "mongoose";

const reminderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    medicineId: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
        required: true
    },
    time: [{
        type: String,
        required: true
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })


export const Reminder = mongoose.model("Reminder", reminderSchema)