 import mongoose, {Schema} from "mongoose";
 import { Timestamp } from "mongodb";
 
 const healthRecordSchema = new Schema({
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
         required: true
     },
     visibility: {
         type: String,
         required: true
     },
     fileURL: {
         type: String,
     }
 }, {timestamps: true})
 
 
 export const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema)