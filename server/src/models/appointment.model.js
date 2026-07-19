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
    reminderAt: {
        type: Date, 
        required: true
    },
    time: {
        type: Date,
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
},{timestamps: true})


export const Appointment = mongoose.model("Appointment", appointmentSchema)