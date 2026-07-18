import mongoose, {Schema} from "mongoose";
import { Timestamp } from "mongodb";

const appointmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    reminderAt: {
        type: Timestamp, 
        required: true
    },
    time: {
        type: Timestamp,
        required: true,
    },
    location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    }
    },
    createdBy: {
        type: String, 
        required: true,
    },   
    updatedBy:{
        type: String,
        required: true
    }
},{timestamps: true})


export const Appointment = mongoose.model("Appointment", appointmentSchema)