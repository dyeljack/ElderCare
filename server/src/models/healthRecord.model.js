 import mongoose, {Schema} from "mongoose";
 
 const healthRecordSchema = new Schema({
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
     visibility: {
         type: String,
         required: true
     },
     fileURL: {
         type: String,
     }
 }, {timestamps: true})
 
 
 export const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema)