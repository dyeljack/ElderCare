 import mongoose, {Schema} from "mongoose";
 
 const verificationSchema = new Schema({
    caretakerId: {
       type: Schema.Types.ObjectId,
       ref: "User",
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