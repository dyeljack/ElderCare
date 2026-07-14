import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import { Timestamp } from "mongodb";
import { time } from "console";

const appointmentSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reminderAt: {
        type: Timestamp, 
        required: true,
    },
    time: {
        type: time,
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