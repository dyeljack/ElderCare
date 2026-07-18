 import mongoose, {Schema} from "mongoose";
 import { Timestamp } from "mongodb";
 
 const emergencySchema = new Schema({
    userId: {
          type: Schema.Types.ObjectId,
            ref: "User"
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
        },
        updatedAt: {
            type: Timestamp,
            required: true
        }
        },
    status: {
         type: String,
         required: true
     },
    triggeredAt: {
         type: timeStamp,
         required: true
     },
    resolvedAt: {
         type: timeStamp,
         required: true
     },
 })
 
 
 export const Emergency = mongoose.model("Emergency", emergencySchema)