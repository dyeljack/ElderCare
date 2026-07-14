 import mongoose, {Schema} from "mongoose";
 import { timeStamp } from "console";
 
 const verificationSchema = new Schema({
    caretakerId: {
         type: String,
         required: true
     },
    documentType: {
         type: String,
         required: true
     },
    fileURL: {
         type: String,
         required: true
     },
     status: {
         type: String,
         required: true
     },
 }, {timestamps: true})
 
 
 export const Verification = mongoose.model("Verification", verificationSchema)