import mongoose, {Schema} from "mongoose";

const appointmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: Date,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    }
    },
    status: {
        type: String,
        enum: ["active", "completed"]
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
},{timestamps: true})


export const Appointment = mongoose.model("Appointment", appointmentSchema)