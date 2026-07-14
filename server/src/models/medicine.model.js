 import mongoose, {Schema} from "mongoose";
 
 const medicineSchema = new Schema({
    name: {
         type: String,
         required: true
     },
    imageURL: {
         type: String
     },
    description: {
         type: String
     },
    createdBy: {
         type: String,
         required: true
     },
    verified: {
         type: Boolean
     }
 })
 
 
 export const Medicine = mongoose.model("Medicine", medicineSchema)