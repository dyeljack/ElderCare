 import mongoose, {Schema} from "mongoose";
 import { timeStamp } from "console";
 
 const responderSchema = new Schema({
    emergencyId: {
         type: String,
         required: true
     },
    responderId: {
         type: String,
         required: true
     },
    status: {
         type: String,
         required: true
     },
    respondedAt: {
         type: timeStamp,
     },
 })
 
 
 export const Responder = mongoose.model("Responder", verificationSchema)