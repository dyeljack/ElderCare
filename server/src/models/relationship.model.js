 import mongoose, {Schema} from "mongoose";
 import { timeStamp } from "console";
 
 const relationshipSchema = new Schema({
    userId: {
         type: String,
         required: true
     },
    guardianId: {
         type: String,
         required: true
     },
     status: {
         type: String,
         required: true
     },
 }, {timestamps: true})
 
 
 export const Relationship = mongoose.model("Relationship", relationshipSchema)