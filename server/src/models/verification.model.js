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
    file: {
         type: String,
         required: true
     }, 
     status: {
         type: String,
         enum: ["pending", "accepted", "rejected"],
         required: true
     },
 }, {timestamps: true})
 
 
 export const Verification = mongoose.model("Verification", verificationSchema)