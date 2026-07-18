 import mongoose, {Schema} from "mongoose";
 
 const relationshipSchema = new Schema({
    userId: {
           type: Schema.Types.ObjectId,
           ref: "User"
     },
    guardianId: {
      type: Schema.Types.ObjectId,
      ref: "User"
     },
     status: {
         type: String,
         required: true
     },
 }, {timestamps: true})
 
 
 export const Relationship = mongoose.model("Relationship", relationshipSchema)