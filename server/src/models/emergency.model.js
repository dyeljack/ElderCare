 import mongoose, {Schema} from "mongoose";
 
 const emergencySchema = new Schema({
    userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
     },
    liveLocation: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
        accuracy: {
            type: Number,
            required: true
        }
        },
    status: {
         type: String,
         enum: ["active", "resolved"],
         required: true
     }
 }, { timestamps: true })
 
 
 export const Emergency = mongoose.model("Emergency", emergencySchema)