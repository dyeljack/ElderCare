 import mongoose, {Schema} from "mongoose";
 
 const medicineSchema = new Schema({
    name: {
         type: String,
         required: true,
         trim: true
     },
    imageURL: {
         type: String
     },
    description: {
         type: String,
         trim: true
     },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
     },
    verified: {
         type: Boolean
     }
 }, {timestamps: true})
 
 
 export const Medicine = mongoose.model("Medicine", medicineSchema)