 import mongoose, {Schema} from "mongoose";
 import { timeStamp } from "console";
 
 const emergencySchema = new Schema({
    userId: {
         type: String,
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
         type: String,
         required: true
     },
    resolvedAt: {
         type: String,
         required: true
     },
 })
 
 
 export const Emergency = mongoose.model("Emergency", emergencySchema)