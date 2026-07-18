 import mongoose, {Schema} from "mongoose";
 
 const relationshipSchema = new Schema({
    userId: {
           type: Schema.Types.ObjectId,
           ref: "User",
           required: true
     },
    guardianId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
     },
     status: {
         type: String,
         required: true
     }
 }, {timestamps: true})
 
 
 export const Relationship = mongoose.model("Relationship", relationshipSchema)